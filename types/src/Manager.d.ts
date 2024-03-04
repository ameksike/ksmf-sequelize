export = SequelizeManager;
declare const SequelizeManager_base: typeof import("ksmf/types/src/dao/DAOBase");
declare class SequelizeManager extends SequelizeManager_base {
    /**
     * @description initialize Sequelize manager
     * @returns {SequelizeManager} self
     */
    initManager(): SequelizeManager;
    /**
     * @description redefine connect method
     * @returns {SequelizeManager} self
     */
    connect(): SequelizeManager;
    /**
     * @description redefine disconnect method
     * @returns {SequelizeManager} self
     */
    disconnect(): SequelizeManager;
    /**
     * @description load load models from dirname
     * @param {String} dirname
     * @param {Function} [callback]
     * @returns {SequelizeManager} self
     */
    load(dirname: string, callback?: Function): SequelizeManager;
    /**
     * @description create models associations
     * @returns {SequelizeManager} self
     */
    associate(): SequelizeManager;
    /**
     * @description redefine logs
     */
    onLog(type: any, message: any): void;
}
