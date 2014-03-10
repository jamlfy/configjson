var cjson = require('cjson');

/**
 * Make `objs` configurable.
 *
 * @param {Object} objs
 * @return {Object} the `objs`
 * @api public
 */

var config = function (tit, obj, opts){
	/**
	 * Mixin settings.
	 */
	var conf = cjson.extend( true, {
		env : process.env.NODE_ENV || 'all'
	}, cjson.load(tit, opts || {
		replace: true
	}), obj);

	this.name = conf.name;
	this.version = conf.version;
	this.description = conf.description;
	this.env = conf.env;
	this.scripts = conf.scripts;

	/**
	 * Set config `name` to `val`, or
	 * multiple with an objsect.
	 *
	 * @param {String|Object} name
	 * @param {Mixed} val
	 * @return {Object} self
	 * @api public
	 */

	config.prototype.set = function(name, val){
		if (1 == arguments.length) {
			for (var key in name)
				conf.set(key, name[key]);
		} else {
			conf[name] = val;
		}

		return conf;
	};

	/**
	 * Get setting `name`.
	 *
	 * @param {String} name
	 * @return {Mixed}
	 * @api public
	 */
	config.prototype.get = function (name){
		return conf[name];
	};

	/**
	 * Enable `name`.
	 *
	 * @param {String} name
	 * @return {Object} self
	 * @api public
	 */
	config.prototype.enable = function (name){
		return conf[ name ] = true ;
	};

	/**
	 * Disable `name`.
	 *
	 * @param {String} name
	 * @return {Object} self
	 * @api public
	 */
	config.prototype.disable = function(name){
		return conf[name] = false;
	};

	/**
	 * Check if `name` is enabled.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	config.prototype.enabled = function(name){
		return !! conf[name];
	};

	/**
	 * Check if `name` is disabled.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	config.prototype.disabled = function(name){
		return ! conf[name];
	};

	/**
	 * Run diferents configiguration
	 *
	 * @param {String} env
	 * @return {Object} self
	 * @api public
	 */
	config.prototype.configure = function (env, fun) {
		if( typeof env === 'function' )
			var fun = env, env = 'all';
		if ( env === 'all' || conf['env'] === env )
			fun.call(this);
		return conf;
	};
};

module.exports = config;