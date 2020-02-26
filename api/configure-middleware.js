const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);


module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(
		session({
			name: "session_cookie",
			secret: "keep it secret, keep it safe",
			cookie: {
				maxAge: 1000 * 60 * 10,
				secure: false, 
				httpOnly: false 
			},
			resave: false,
			saveUninitialized: true, // gdpr
			store: new KnexSessionStore({
				knex: require("../database/dbConfig.js"), // configured instance of knex
				tablename: "sessions", // table 
				sidfieldname: "sid", // column that will hold the session id
				createtable: true, // create table if it doesn't exist
				clearInterval: 1000 * 60 
			})
		})
	);
};
