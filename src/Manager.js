/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @dependencies sequelize, fs, path
 * @requires    sequelize
 **/

const KsMf = require('ksmf');
class SequelizeManager extends KsMf.dao.Base {

    /**
     * @description initialize Sequelize manager
     * @returns {SequelizeManager} self
     */
    initManager() {
        this.manager = this.manager || require('sequelize');;
        if (!this.manager || this.driver) {
            return this;
        }
        const opts = {
            define: {
                timestamps: false
            },
            pool: {
                max: 30,
                min: 3,
                acquire: 30000,
                idle: 10000,
            },
            retry: {
                match: [
                    this.manager.ConnectionError,
                    this.manager.ConnectionTimedOutError,
                    this.manager.TimeoutError,
                    /Deadlock/i
                ],
                max: 3
            },
            benchmark: true,
            logging: (msg, timingMs) => {
                if ("Executed (default): SELECT 1+1 AS result" !== msg) {
                    this.log('debug', {
                        src: "models:db:query",
                        message: msg,
                        data: { timingMs }
                    });
                }
            },
            logQueryParameters: true,
            ...this.option
        };

        const url = this.option?.url || this.conn2str(this.option);
        this.driver = new this.manager(url, opts);
        return this;
    }

    /**
     * @description redefine connect method
     * @returns {SequelizeManager} self
     */
    connect() {
        this.initManager();
        this.driver
            .authenticate()
            .then((error) => {
                if (error) {
                    if (this.onError instanceof Function) {
                        this.onError(error);
                    }
                } else {
                    this.onConnect(this.option);
                }
            })
            .catch((error) => {
                if (this.onError instanceof Function) {
                    this.onError(error);
                }
            });
        return this;
    }

    /**
     * @description redefine disconnect method
     * @returns {SequelizeManager} self
     */
    disconnect() {
        if (this.driver?.close instanceof Function) {
            this.driver.close();
        }
        return this;
    }

    /**
     * @description load load models from dirname
     * @param {String} dirname 
     * @param {Function} [callback] 
     * @returns {SequelizeManager} self
     */
    load(dirname, callback) {
        const fs = require('fs');
        const path = require('path');
        const Sequelize = this.manager;
        if (!this.driver) {
            return this;
        }
        try {
            fs
                .readdirSync(dirname)
                .filter(file => {
                    return (file !== 'index.js') && (file.endsWith('.js'));
                })
                .forEach(file => {
                    const target = require(path.join(dirname, file));
                    if (target instanceof Function) {
                        const model = target(this.driver, Sequelize.DataTypes);
                        this.models[model.name] = model;
                        if (callback instanceof Function) {
                            callback(model.name, model, this.models);
                        }
                    }
                });
        }
        catch (error) { }
        return this;
    }

    /**
     * @description create models associations
     * @returns {SequelizeManager} self
     */
    associate() {
        Object.keys(this.models).forEach(modelName => {
            if (this.models[modelName]?.associate) {
                this.models[modelName].associate(this.models);
            }
        });
        return this;
    }

    /**
     * @description redefine logs
     */
    onLog(type, message) {
        const logger = this.helper?.get("logger");
        const log = logger ? logger[type] : null;
        (log instanceof Function) && log({
            src: "KSMF.DAO.Sequelize",
            message
        });
    }
}
module.exports = SequelizeManager;