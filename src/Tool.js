/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @dependencies sequelize, fs, path
 * @requires    sequelize
 * @requires    sequelize-auto
 **/
const SequelizeAuto = require('sequelize-auto');
class SequelizeTool {

    /**
     * @description allow generating models from db
     * @param {Object} config 
     * @param {String} [config.database] 
     * @param {String} [config.username]
     * @param {String} [config.password] 
     * @param {String} [config.host]
     * @param {String} [config.port]
     * @param {String} [config.output] 
     * @param {String} [config.caseFile] 
     * @param {String} [config.caseModel] 
     * @param {String} [config.caseProp] 
     * @param {String} [config.lang] 
     * @param {Number} [config.indentation] 
     * @param {Boolean} [config.useDefine] 
     * @param {Boolean} [config.singularize] 
     * @param {Boolean} [config.spaces] 
     * @param {Object|null} [logger] 
     * @returns {Promise<any>} res
     */
    async process(config, logger = null) {
        const path = require('path');
        const output = path.join(__dirname, "../db/models");
        const defaults = {
            directory: config?.output || output,
            caseFile: config?.caseFile || 'l',
            caseModel: config?.caseModel || 'p',
            caseProp: config?.caseProp || 'c',
            lang: config?.lang || 'js',  // ts,js
            useDefine: config?.useDefine ?? false,
            singularize: config?.singularize ?? true,
            spaces: config?.spaces ?? true,
            indentation: config?.indentation || 2
        };
        const options = Object.assign({}, defaults, config || {});
        try {
            const auto = new SequelizeAuto(config.database, config.username, config.password, options);
            const res = await auto.run();
            const tableNames = Object.keys(res.tables);
            logger?.info && logger.info({
                src: "models:db:auto:process",
                message: "Importation success",
                data: tableNames
            });
            return res;
        }
        catch (error) {
            logger?.error && logger.error({
                src: "models:db:auto:process",
                message: error?.message || error,
                data: { config, options }
            });
        }
    }

    /**
     * @description add column if it doesn't exist
     * @param {Object} queryInterface
     * @param {Object} Sequelize  
     * @param {String} tableName 
     * @param {String} columnName 
     * @param {Object} options 
     * @return {Promise} 
     */
    addColumn(queryInterface, Sequelize, tableName, columnName, options) {
        options = options || { type: Sequelize.STRING, allowNull: true };
        return queryInterface.describeTable(tableName).then(tableDefinition => {
            if (!tableDefinition[columnName]) {
                return queryInterface.addColumn(tableName, columnName, options);
            } else {
                return Promise.resolve(true);
            }
        });
    }

    /**
     * @description remove column if it exists
     * @param {Object} queryInterface
     * @param {String} tableName 
     * @param {String} columnName 
     * @return {Promise} 
     */
    removeColumn(queryInterface, tableName, columnName) {
        return queryInterface.describeTable(tableName).then(tableDefinition => {
            if (tableDefinition[columnName]) {
                return queryInterface.removeColumn(tableName, columnName);
            } else {
                return Promise.resolve(true);
            }
        });
    }

    /**
     * @description change column
     * @param {Object} queryInterface
     * @param {Object} Sequelize  
     * @param {String} tableName 
     * @param {String} columnName 
     * @param {Object} options 
     * @return {Promise} 
     */
    changeColumn(queryInterface, Sequelize, tableName, columnName, options) {
        return queryInterface.changeColumn(tableName, columnName, options);
    }

    /**
     * @description perform sql query
     * @param {Object} queryInterface
     * @param {String} sql  
     * @return {Promise} 
     */
    query(queryInterface, sql) {
        return queryInterface.sequelize.query(sql);
    }

    /**
     * @description run sql file
     * @param {Object} queryInterface
     * @param {String} file  
     * @return {Promise} 
     */
    async run(queryInterface, file) {
        const fs = require('fs');
        if (!queryInterface || !file) {
            throw new Error('Query Interface is null or the file is empty');
        }
        if (!fs.existsSync(file)) {
            throw new Error('File no exists : ' + file);
        }
        const sql = fs.readFileSync(file, 'utf8');
        if (!sql) {
            throw new Error('Script is empty or not utf8 format');
        }
        return await queryInterface.sequelize.query(sql);
    }
}
module.exports = SequelizeTool;