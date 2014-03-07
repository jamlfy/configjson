
/**
 * Make `obj` configurable.
 *
 * @param {Object} obj
 * @return {Object} the `obj`
 * @api public
 */

var cjson = require('cjson');

module.exports = function(tit, obj, opts){
	/**
	 * Mixin settings.
	 */

	obj.settings = cjson.load(tit, opts || {
		replace: true
	});

	obj.settings = cjson.extend( obj.settings, obj);

	/**
	 * Set config `name` to `val`, or
	 * multiple with an object.
	 *
	 * @param {String|Object} name
	 * @param {Mixed} val
	 * @return {Object} self
	 * @api public
	 */

	obj.set = function(name, val){
		if (1 == arguments.length) {
			for (var key in name)
				obj.set(key, name[key]);
		} else {
			obj.settings[name] = val;
		}

		return obj;
	};

	/**
	 * Get setting `name`.
	 *
	 * @param {String} name
	 * @return {Mixed}
	 * @api public
	 */

	obj.get = function(name){
		return obj.settings[name];
	};

	/**
	 * Enable `name`.
	 *
	 * @param {String} name
	 * @return {Object} self
	 * @api public
	 */

	obj.enable = function(name){
		return obj.set(name, true);
	};

	/**
	 * Disable `name`.
	 *
	 * @param {String} name
	 * @return {Object} self
	 * @api public
	 */

	obj.disable = function(name){
		return obj.set(name, false);
	};

	/**
	 * Check if `name` is enabled.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	obj.enabled = function(name){
		return !! obj.get(name);
	};

	/**
	 * Check if `name` is disabled.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	obj.disabled = function(name){
		return ! obj.get(name);
	};

	/**
	 * Run diferents configuration
	 *
	 * @param {String} env
	 * @return {Object} self
	 * @api public
	 */

	obj.configure = function (env, fun) {
		if( typeof env === 'function' )
			var fun = env, env = 'all';

		if ( env === 'all' || obj.set('env') === env )
			fun.call(this);

		return obj;
	};

	obj.set('env', process.env.NODE_ENV || obj.settings.env || 'all' );

	return obj;
};