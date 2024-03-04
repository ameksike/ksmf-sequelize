declare const _exports: {
    cls: {
        Manager: typeof Manager;
        Wrapper: typeof import("./src/Wrapper");
        Tool: typeof import("./src/Tool");
    };
    initManager(): Manager;
    manager: any;
    driver: any;
    connect(): Manager;
    disconnect(): Manager;
    load(dirname: string, callback?: Function): Manager;
    associate(): Manager;
    onLog(type: any, message: any): void;
    logger: Console;
    helper: any;
    models: any;
    option: {};
    configure(payload?: any): import("ksmf/types/src/dao/DAOBase");
    getUri(): string;
    conn2str(cfg: string | {
        dialect?: string;
        username?: string;
        password?: string;
        database?: string;
        protocol?: string;
        host?: string;
        port?: string;
    }): string;
    log(type: string | number, message: any): void;
    onError(error: any): void;
    onConnect(option: any): void;
    onDisconnect(option: any): void;
};
export = _exports;
import Manager = require("./src/Manager");
