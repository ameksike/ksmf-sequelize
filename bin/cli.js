/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2035
 * @license    	GPL
 * @version    	1.0
 * @description CLI application, for more information see: https://github.com/ameksike/ksmf/wiki  
 **/
let app = null;
try {
    const KsMf = require('ksmf');
    const pluginSequelize = require('../');
    const path = require('path');
    const tool = new pluginSequelize.cls.Tool();

    let dir = path.resolve(process.cwd());
    let act = process.argv[2] || "web";
    app = new KsMf.app.WEB(dir);

    switch (act) {
        default:
            app.initConfig();
            let opt = app.cfg.srv.db;
            opt.directory = path.join(dir, opt?.models || "db/models");
            tool.process(opt, app.helper?.get("logger"));
            break;
    }
}
catch (error) {
    console.log({
        flow: String(Date.now()) + "00",
        level: 1,
        src: "KSMF:Sequelize:bin:CLI",
        error
    });
}

module.exports = app;