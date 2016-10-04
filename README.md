# sync-mysql

[![Node.js Version][node-version-image]][node-version-url]

---

**sync-mysql** is designed to make synchronous queries to the database. It has been developed as a tool to help [nightwatch.js](http://nightwatchjs.org/) tests - or other such tools - connect directly to a mysql database.

## Testing

**This package is still undergoing tests.**

## Important note

You should not be using this in a production evironment. Node.js is designed to be asynchronous, therefore running sync queries on the database will seriously impact performance and stability.

## Install

```
npm install cristidraghici/sync-mysql
```

## Usage

```js
var syncMysql = require('../');

var output = syncMysql(
	{
		host: 'localhost',
		user: 'user',
		pass: 'password',
		database: 'database',
		port: '3306'
	},
	"select * from users"
);

console.log(output);
```

## Testing

- please edit the *.env.example* with database information and the sql to test and save the file as *.env*;
- run `npm install`;
- run `npm run test`.

## Workflow

Internally, this uses a separate worker process that is run using [childProcess.spawnSync](http://nodejs.org/docs/v0.11.13/api/child_process.html#child_process_child_process_spawnsync_command_args_options).

The worker then makes the actual query using the [mysql](https://www.npmjs.com/package/mysql) package.

## Thanks

Thanks to [sync-request](https://github.com/ForbesLindesay/sync-request) / [Forbes Lindesay](https://github.com/ForbesLindesay) for providing the base knowledge for this package.

## License

MIT