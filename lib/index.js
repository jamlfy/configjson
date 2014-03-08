
/**
 * Make `objs` configurable.
 *
 * @param {Object} objs
 * @return {Object} the `objs`
 * @api public
 */

var cjson = require('cjson');

module.exports = function(tit, obj, opts){
	/**
	 * Mixin settings.
	 */

	var objs = cjson.load(tit, opts || {
		replace: true
	});

	objs = cjson.extend( true, objs, obj);

	/**
	 * Set config `name` to `val`, or
	 * multiple with an objsect.
	 *
	 * @param {String|Object} name
	 * @param {Mixed} val
	 * @return {Object} self
	 * @api public
	 */
	objs.set = function(name, val){
		if (1 == arguments.length) {
			for (var key in name)
				objs.set(key, name[key]);
		} else {
			objs[name] = val;
		}

		return objs;
	};

	/**
	 * Get setting `name`.
	 *
	 * @param {String} name
	 * @return {Mixed}
	 * @api public
	 */

	objs.get = function(name){
		return objs[name];
	};

	/**
	 * Enable `name`.
	 *
	 * @param {String} name
	 * @return {Object} self
	 * @api public
	 */

	objs.enable = function(name){
		return objs.set(name, true);
	};

	/**
	 * Disable `name`.
	 *
	 * @param {String} name
	 * @return {Object} self
	 * @api public
	 */

	objs.disable = function(name){
		return objs.set(name, false);
	};

	/**
	 * Check if `name` is enabled.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	objs.enabled = function(name){
		return !! objs.get(name);
	};

	/**
	 * Check if `name` is disabled.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	objs.disabled = function(name){
		return ! objs.get(name);
	};

	/**
	 * Run diferents configuration
	 *
	 * @param {String} env
	 * @return {Object} self
	 * @api public
	 */

	objs.configure = function (env, fun) {
		if( typeof env === 'function' )
			var fun = env, env = 'all';

		if ( env === 'all' || objs.set('env') === env )
			fun.call(this);

		return objs;
	};

	objs.set('env', process.env.NODE_ENV || 'all' );

	return objs;
};