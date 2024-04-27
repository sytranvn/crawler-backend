'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const mssql = require('fastify-mssql')
const { warn } = require('console')

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function(fastify, opts) {
  // Place here your custom code!

  fastify.register(mssql, {
    server: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    options: {
      trustServerCertificate: true,
    },
  })
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
