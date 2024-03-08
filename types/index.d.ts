declare const _exports: {
    new (opt: any): {
        helper: any;
        logger: Console;
        dao: any;
        cfg: {};
        exclude: any;
        service: any;
        onInitConfig(cfg: any): void;
        app: any;
        onInitModules(): void;
        utl: any;
        onLoadModule(mod: any): any;
        onLoadedModules(modules: any[]): void;
        loadModules(): void;
        onStop(): void;
    };
    cls: {
        Manager: typeof Manager;
        Wrapper: typeof Wrapper;
        Tool: typeof import("./src/Tool");
    };
};
export = _exports;
import Manager = require("./src/Manager");
import Wrapper = require("./src/Wrapper");
