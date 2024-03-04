/**
 * @typedef {"es5" | "es6" | "esm" | "ts"} TLangOption
 * @typedef {'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'} TDialect
 */

/**
 * @typedef {Object} TDialectOptions
 * @property {any} [options]
 */

/**
 * @typedef {Object} TAutoOptions
 * @property {String} [schema] - Database schema to export
 * @property {String} [database] - Database name
 * @property {String} [username] - Database username
 * @property {String} [password] - Database password
 * @property {String} [storage] - File where database is stored (sqlite only) 
 * @property {String} [host] - Database host
 * @property {Number} [port] - Database port
 * @property {TDialect} [dialect] - Database dialect 
 * @property {String} [directory] - Case of file names
 * @property {import('sequelize-auto').CaseOption} [caseFile] - Case of file names
 * @property {import('sequelize-auto').CaseOption} [caseModel] - Case of model names
 * @property {import('sequelize-auto').CaseOption} [caseProp] - Case of property names
 * @property {TLangOption} [lang] - Model language (default js) 
 * @property {Number} [indentation] - Number of spaces or tabs to indent (default 2) 
 * @property {Boolean} [useDefine] - Use `sequelize.define` instead of `init` for model initialization.
 * @property {Boolean} [singularize] - Whether to singularize model names
 * @property {Boolean} [spaces] - Whether to indent with spaces instead of tabs (default true) 
 * @property {Boolean} [noAlias] - Whether to avoid creating alias property in relations (default false) 
 * @property {Boolean} [noIndexes] - Whether to skip writing index information
 * @property {Boolean} [noInitModels] - Whether to skip writing the init-models file
 * @property {Boolean} [views] - Whether to export views (default false) 
 * @property {Array<string>} [skipTables]  - Tables to skip exporting
 * @property {Array<string>} [skipFields]  - Fields to skip exporting
 * @property {Array<string>} [tables] - Tables to export (default all) 
 * @property {Array<string>} [pkSuffixes] - Primary Key Suffixes to trim (default "id")
 * @property {TDialectOptions} [dialectOptions] - Dialect-specific options
 */

/**
 * @template [T=object]
 * @typedef {{[name:String]:T}} TList 
 **/

module.exports = {};