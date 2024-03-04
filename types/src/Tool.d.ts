export = SequelizeTool;
declare class SequelizeTool {
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
    process(config: {
        database?: string;
        username?: string;
        password?: string;
        host?: string;
        port?: string;
        output?: string;
        caseFile?: string;
        caseModel?: string;
        caseProp?: string;
        lang?: string;
        indentation?: number;
        useDefine?: boolean;
        singularize?: boolean;
        spaces?: boolean;
    }, logger?: any | null): Promise<any>;
    /**
     * @description add column if it doesn't exist
     * @param {Object} queryInterface
     * @param {Object} Sequelize
     * @param {String} tableName
     * @param {String} columnName
     * @param {Object} options
     * @return {Promise}
     */
    addColumn(queryInterface: any, Sequelize: any, tableName: string, columnName: string, options: any): Promise<any>;
    /**
     * @description remove column if it exists
     * @param {Object} queryInterface
     * @param {String} tableName
     * @param {String} columnName
     * @return {Promise}
     */
    removeColumn(queryInterface: any, tableName: string, columnName: string): Promise<any>;
    /**
     * @description change column
     * @param {Object} queryInterface
     * @param {Object} Sequelize
     * @param {String} tableName
     * @param {String} columnName
     * @param {Object} options
     * @return {Promise}
     */
    changeColumn(queryInterface: any, Sequelize: any, tableName: string, columnName: string, options: any): Promise<any>;
    /**
     * @description perform sql query
     * @param {Object} queryInterface
     * @param {String} sql
     * @return {Promise}
     */
    query(queryInterface: any, sql: string): Promise<any>;
    /**
     * @description run sql file
     * @param {Object} queryInterface
     * @param {String} file
     * @return {Promise}
     */
    run(queryInterface: any, file: string): Promise<any>;
}
