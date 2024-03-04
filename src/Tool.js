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

/**
 * @typedef {import('./types').TAutoOptions} TAutoOptions
 */
class SequelizeTool {

    /**
     * @description allow generating models from db
     * @param {TAutoOptions} config 
     * @param {Object|null} [logger] 
     * @returns {Promise<any>} res
     */
    async process(config, logger = null) {
        const path = require('path');
        const options = {
            directory: config?.directory || path.join(__dirname, "../db/models"),
            /** Case of file names */
            caseFile: config?.caseFile || 'l',
            /** Case of model names */
            caseModel: config?.caseModel || 'p',
            /** Case of property names */
            caseProp: config?.caseProp || 'c',
            /** Model language */
            lang: config?.lang || 'js',  // ts,js
            /** Use `sequelize.define` instead of `init` for model initialization.  See issues #527, #559, #573 */
            useDefine: config?.useDefine ?? false,
            /** Whether to singularize model names */
            singularize: config?.singularize ?? true,
            /** Whether to indent with spaces instead of tabs (default true) */
            spaces: config?.spaces ?? true,
            closeConnectionAutomatically: true,
            /** Number of spaces or tabs to indent (default 2) */
            indentation: config?.indentation || 2,
            /** Whether to avoid creating alias property in relations */
            noAlias: config?.spaces ?? false,
            /** Whether to skip writing index information */
            noIndexes: config?.noIndexes ?? true,
            /** Whether to skip writing the init-models file */
            noInitModels: config?.noInitModels ?? true,
            /** File where database is stored (sqlite only) */
            storage: config?.storage || undefined,
            /** Database host */
            host: config?.host || undefined,
            /** Database port */
            port: config?.port || undefined,
            /** Database name */
            database: config?.database || undefined,
            /** Database dialect */
            dialect: config?.dialect || undefined,
            dialectOptions: config?.dialectOptions || undefined,
            /** Database username */
            username: config?.username || undefined,
            /** Database password */
            password: config?.password || undefined,
            /** Whether to export views (default false) */
            views: config?.views || undefined,
            /** Database schema to export */
            schema: config?.schema || undefined,
            /** Tables to skip exporting */
            skipTables: config?.skipTables || undefined,
            /** Tables to skip exporting */
            skipFields: config?.skipFields || undefined,
            /** Tables to export (default all) */
            tables: config?.tables || undefined,
            /** Primary Key Suffixes to trim (default "id") */
            pkSuffixes: config?.pkSuffixes || undefined,
        };
        try {
            const auto = new SequelizeAuto.default(config.database, config.username, config.password, options);
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