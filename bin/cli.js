#!/usr/bin/env node

/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        20/03/2022
 * @copyright   Copyright (c) 2020-2035
 * @license     GPL
 * @version     1.0
 * @description CLI application 
 * @link        https://github.com/ameksike/ksmf/wiki
 **/
try {
    const KsMf = require('ksmf');
    const path = require('path');
    const plugin = require('../');
    let action = process.argv[2] || 'web';

    switch (action) {
        case '-v':
        case '--version':
            console.log('KsMf Sequelize version: 1.2.1');
            break;

        default:
            let dir = path.resolve(process.cwd());
            let app = new KsMf.app.CLI({ path: dir });
            app?.initLoad();
            let params = app?.params();
            let opt = { ...app?.cfg?.srv?.db, ...params };
            opt.directory = opt.directory || path.join(dir, opt?.models || 'db/models');
            const tool = new plugin.cls.Tool(opt);
            tool?.exec instanceof Function && tool.exec();
            break;
    }
}
catch (error) {
    console.log({
        flow: String(Date.now()) + '00',
        level: 1,
        src: 'KSMF:bin:CLI',
        error
    });
}