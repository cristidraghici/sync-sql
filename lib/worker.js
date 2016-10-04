/*jslint node: true, nomen: true */
'use strict';

var mysql = require('mysql');
var JSONB = require('json-buffer');
var concat = require('concat-stream');


/**
 * The response function
 * @param {object} data Object containing the response
 */
var respond = function (data) {
	process.stdout.write(JSONB.stringify(data), function () {
		process.exit(0);
	});
};

/*
 * Create the piped request
 */
process.stdin.pipe(concat(function (stdin) {
	var req = JSONB.parse(stdin.toString()),
		query = req.query,
		params = req.params,
		connectionInfo = {
			host: req.connection.host,
			user: req.connection.user,
			password: req.connection.password,
			database: req.connection.database,
			port: req.connection.port || 3306
		},
		connection;

	// Connection validation
	if (typeof connectionInfo.host !== 'string' || connectionInfo.host.length === 0) {
		return respond({
			success: false,
			data: {
				err: 'Bad hostname provided.',
				query: query,
				connection: connectionInfo
			}
		});
	}
	if (typeof connectionInfo.user !== 'string' || connectionInfo.user.length === 0) {
		return respond({
			success: false,
			data: {
				err: 'Bad username provided.',
				query: query,
				connection: connectionInfo
			}
		});
	}
	
	if (typeof connectionInfo.password !== 'string') {
		return respond({
			success: false,
			data: {
				err: 'Bad password provided.',
				query: query,
				connection: connectionInfo
			}
		});
	}
	if (typeof connectionInfo.database !== 'string' || connectionInfo.database.length === 0) {
		return respond({
			success: false,
			data: {
				err: 'Bad database provided.',
				query: query,
				connection: connectionInfo
			}
		});
	}


	// Return if no sql query specified
	if (query.length === 0) {
		return respond({
			success: false,
			data: {
				err: 'No SQL query specified.'
			}
		});
	}

	// Create the connection to the database
	connection = mysql.createConnection(connectionInfo);

	// Connect to the database
	connection.connect();

	// Do the query
	connection.query(query, params, function (err, rows, fields) {
		// End the connection
		connection.end();

		// Return the error and stop
		if (err) {
			return respond({
				success: false,
				data: {
					err: err,
					query: query,
					connection: connectionInfo
				}

			});
		}

		// Do the callback
		respond({
			success: true,
			data: {
				rows: rows,
				fields: fields
			}
		});
	});
}));