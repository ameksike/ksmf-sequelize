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

    let dir = path.resolve(process.cwd());
    let app = new KsMf.app.App(dir);
    app?.initConfig();
    let opt = app?.cfg?.srv?.db;
    opt.directory = path.join(dir, opt?.models || 'db/models');
    const tool = plugin.cls.Tool(opt);
    tool?.run instanceof Function && tool.run();
}
catch (error) {
    console.log({
        flow: String(Date.now()) + '00',
        level: 1,
        src: 'KSMF:bin:CLI',
        error
    });
}