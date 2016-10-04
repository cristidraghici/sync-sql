/*jslint node: true, nomen: true */
'use strict';

var syncMysql = require('../');
var dotenv = require('dotenv');

// Load the .env file
dotenv.config();

var output = syncMysql(
	{
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASS,
		database: process.env.DATABASE,
		port: process.env.PORT
	},
	process.env.SQL
);

console.log(JSON.stringify(output));