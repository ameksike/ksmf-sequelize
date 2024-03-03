declare const _exports: {
    cls: {
        Manager: typeof Manager;
        Wrapper: typeof import("./src/DAOWrapper");
    };
    initManager(): Manager;
    manager: any;
    driver: any;
    connect(): Manager;
    disconnect(): Manager;
    load(dirname: string, callback?: Function): Manager;
    associate(): Manager;
    onLog(type: any, message: any): void;
};
export = _exports;
import Manager = require("./src/DAOSequelize");
