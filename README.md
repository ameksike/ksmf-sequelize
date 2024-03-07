# KsMf-Sequelize

Plugin to add Sequelize support for KsMf.

## Sequelize

**[Sequelize](https://sequelize.org/)** is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.

## KsMf

**[KsMf](https://www.npmjs.com/package/ksmf)** stands as a modular microframework tailored for crafting minimalist web, CLI applications, or REST APIs. Leveraging the robust capabilities of [KsDp](https://github.com/ameksike/ksdp/wiki), it extends support across a spectrum of web servers or frameworks like [Express Js](https://expressjs.com), [Fastify](https://fastify.dev), etc. For further information see our [wiki](https://github.com/ameksike/ksmf/wiki).

This library belong to the **Ksike** ecosystem:

- [KsMf](https://www.npmjs.com/package/ksmf) - Microframework (WEB, REST API, CLI, Proxy, etc)
- [Ksdp](https://www.npmjs.com/package/ksdp) - Design Patterns Library (GoF, GRASP, IoC, DI, etc)
- [KsCryp](https://www.npmjs.com/package/kscryp) - Cryptographic Library (RSA, JWT, x509, HEX, Base64, Hash, etc)
- [KsHook](https://www.npmjs.com/package/kshook) - Event Driven Library
- [KsEval](https://www.npmjs.com/package/kseval) - Expression Evaluator Library
- [KsWC](https://www.npmjs.com/package/kswc) - Web API deployment Library
- [KsTpl](https://www.npmjs.com/package/kstpl) - Template Engine
- [KsDocs](https://www.npmjs.com/package/ksdocs) - Document Engine

## Quick Overview

1. Intall the plugin

```json
npm install --save ksmf-sequelize
```

2. Intall the the driver for your database of choice:

```
# One of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
```

3.  Configure your project
    There are three ways to configure your project using **KsMf**:

    - Configuration file.
    - Manual configuration.
    - Manual plugin registration.

    3.1. By configuration File

`[PROJECT_PATH]/cfg/core.json`

```json
{
  "development": {
    "port": 3030,
    "host": "localhost",
    "module": { "load": ["app"] },
    "event": {
      "onInitConfig": ["plugin.sequelize"]
    },
    "helper": {
      "plugin.sequelize": {
        "name": "ksmf-sequelize",
        "type": "lib",
        "params": {
          "exclude": ["forest"],
          "service": "rest"
        },
        "dependency": {
          "helper": "helper"
        }
      }
    }
  }
}
```

    3.3. Manual configuration

```js
// import the ksmf framework
const KsMf = require("ksmf");
// create the application
const app = new KsMf.app.WEB(dir);
// initialize the application
app
  .init({
    development: {
      port: 3030,
      host: "localhost",
      module: { load: ["app"] },
      event: {
        onInitConfig: ["plugin.sequelize"],
      },
      helper: {
        "plugin.sequelize": {
          name: "ksmf-sequelize",
          type: "lib",
          params: {
            exclude: ["forest"],
            service: "rest",
          },
          dependency: {
            helper: "helper",
          },
        },
      },
    },
  })
  .then((app) => start());
```

    3.3. Manual plugin registration

```js
// import the ksmf framework
const KsMf = require("ksmf");
// create the application
const app = new KsMf.app.WEB(dir);
// create an isntance of the plugin
const plugin = app?.helper?.get({
  name: "ksmf-sequelize",
  type: "lib",
  params: {
    exclude: ["forest"],
    service: "rest",
  },
  dependency: {
    helper: "helper",
  },
});
// subscribe the plugin into the onInitConfig app event
app?.subscribe(plugin, "onInitConfig");
// start the application
app.start();
```
