export = SequelizeTool;
declare class SequelizeTool {
    /**
     * @description allow generating models from db
     * @param {Object} config
     * @returns {Promise<any>} res
     */
    process(config: any, logger: any): Promise<any>;
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
