'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    await fastify.mssql.pool.connect();
    const res = await fastify.mssql.pool.query('SELECT * FROM emp');
    return { emp: res.recordset };
  })
}
