export = SequelizeWrapper;
declare class SequelizeWrapper {
    /**
     * @description Initialize options on construct DATAWrapper
     * @param {Object} opt
     */
    constructor(opt: any);
    /**
     * @type {Object|null}
     */
    helper: any | null;
    /**
     * @type {Console|null}
     */
    logger: Console | null;
    dao: any;
    cfg: {};
    exclude: any;
    service: any;
    /**
     * @description Set options on Initialize Configuration Event
     * @param {Object} cfg
     */
    onInitConfig(cfg: any): void;
    app: any;
    /**
     * @description Load DAO library and start the database connection
     */
    onInitModules(): void;
    utl: any;
    /**
     * @description Load models for each module
     * @param {Object} mod
     */
    onLoadModule(mod: any): any;
    /**
     * @description create all models associations
     * @param {Array} modules
     */
    onLoadedModules(modules: any[]): void;
    /**
     * @description Support auto Data Modules
     */
    loadModules(): void;
    /**
     * @description Close database connections
     */
    onStop(): void;
}
