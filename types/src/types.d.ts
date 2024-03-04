export type TLangOption = "es5" | "es6" | "esm" | "ts";
export type TDialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle';
export type TDialectOptions = {
    options?: any;
};
export type TAutoOptions = {
    /**
     * - Database schema to export
     */
    schema?: string;
    /**
     * - Database name
     */
    database?: string;
    /**
     * - Database username
     */
    username?: string;
    /**
     * - Database password
     */
    password?: string;
    /**
     * - File where database is stored (sqlite only)
     */
    storage?: string;
    /**
     * - Database host
     */
    host?: string;
    /**
     * - Database port
     */
    port?: number;
    /**
     * - Database dialect
     */
    dialect?: TDialect;
    /**
     * - Case of file names
     */
    directory?: string;
    /**
     * - Case of file names
     */
    caseFile?: import('sequelize-auto').CaseOption;
    /**
     * - Case of model names
     */
    caseModel?: import('sequelize-auto').CaseOption;
    /**
     * - Case of property names
     */
    caseProp?: import('sequelize-auto').CaseOption;
    /**
     * - Model language (default js)
     */
    lang?: TLangOption;
    /**
     * - Number of spaces or tabs to indent (default 2)
     */
    indentation?: number;
    /**
     * - Use `sequelize.define` instead of `init` for model initialization.
     */
    useDefine?: boolean;
    /**
     * - Whether to singularize model names
     */
    singularize?: boolean;
    /**
     * - Whether to indent with spaces instead of tabs (default true)
     */
    spaces?: boolean;
    /**
     * - Whether to avoid creating alias property in relations (default false)
     */
    noAlias?: boolean;
    /**
     * - Whether to skip writing index information
     */
    noIndexes?: boolean;
    /**
     * - Whether to skip writing the init-models file
     */
    noInitModels?: boolean;
    /**
     * - Whether to export views (default false)
     */
    views?: boolean;
    /**
     * - Tables to skip exporting
     */
    skipTables?: Array<string>;
    /**
     * - Fields to skip exporting
     */
    skipFields?: Array<string>;
    /**
     * - Tables to export (default all)
     */
    tables?: Array<string>;
    /**
     * - Primary Key Suffixes to trim (default "id")
     */
    pkSuffixes?: Array<string>;
    /**
     * - Dialect-specific options
     */
    dialectOptions?: TDialectOptions;
};
export type TList<T = any> = {
    [name: string]: T;
};
