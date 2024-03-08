/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		22/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 */

const path = require('path');
class SequelizeWrapper {

    /**
     * @type {Object|null}
     */
    helper = null;

    /**
     * @type {Console|null}
     */
    logger = null;

    /**
     * @description Initialize options on construct DATAWrapper
     * @param {Object} opt 
     */
    constructor(opt) {
        this.dao = null;
        this.cfg = {};
        this.exclude = Array.isArray(opt?.exclude) ? opt.exclude : [];
        this.service = opt?.service;
    }

    /**
     * @description Set options on Initialize Configuration Event 
     * @param {Object} cfg 
     */
    onInitConfig(cfg) {
        this.cfg = cfg;
        this.app = this.helper?.get('app');
        const manager = this.app?.helper?.get({
            'namespace': 'cls.Manager',
            'name': 'ksmf-sequelize',
            'type': 'lib',
            'dependency': {
                'helper': 'helper'
            }
        });
        // Register the DAO library into the IoC manager
        manager && this.app?.register(manager, 'dao');
        // Load DAO library and start the database connection
        this.app?.subscribe(this, 'onInitModules');
        // Load models for each module
        this.app?.subscribe(this, 'onLoadModule');
        // Support auto Data Modules
        this.app?.subscribe(this, 'onLoadedModules');
        // Close database connections
        this.app?.subscribe(this, 'onStop');
    }

    /**
     * @description Load DAO library and start the database connection
     */
    onInitModules() {
        this.dao = this.helper.get('dao');
        this.app = this.helper.get('app');
        this.utl = this.helper.get('utl');
        if (this.dao) {
            let cfg = this.cfg?.srv?.db || this.cfg?.srv;
            let option = this.utl?.from(cfg, this.cfg.srv.from) || cfg;
            if (this.dao.inject instanceof Function) {
                this.dao.inject({ option });
            } else {
                this.dao.option = option;
            }
            this.dao.connect();
            this.dao.load(path.join(this.cfg.path, 'db/models/'));
        }
    }

    /**
     * @description Load models for each module 
     * @param {Object} mod 
     */
    onLoadModule(mod) {
        if (!this.dao) {
            return null;
        }
        if (!this.exclude.includes(mod.name)) {
            let pat = mod._?.path || path.join(this.cfg.srv.module.path, mod.name);
            let dir = path.join(pat, 'model');
            this.dao.load(dir);
        }
    }

    /**
     * @description create all models associations
     * @param {Array} modules 
     */
    onLoadedModules(modules) {
        this.dao?.associate && this.dao.associate();
        this.loadModules();
    }

    /**
     * @description Support auto Data Modules
     */
    loadModules() {
        this.dao = this.dao || this.helper?.get('dao');
        this.app = this.app || this.helper.get('app');
        if (!this.app || !this.dao?.models || this.service !== 'rest') {
            return;
        }
        for (let name in this.dao.models) {
            let mod = {
                'id': 'ksmf.rest.' + name,
                'name': 'ksmf',
                'type': 'lib',
                'namespace': 'dao.DataModule',
                'options': {
                    'db': {
                        'modelName': name
                    }
                }
            };
            this.app.initModule(mod);
        }
    }

    /**
     * @description Close database connections
     */
    onStop() {
        this.dao = this.dao || this.helper?.get('dao');
        if (this.dao?.disconnect instanceof Function) {
            this.dao.disconnect();
        }
    }
}
module.exports = SequelizeWrapper;