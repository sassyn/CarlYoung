#!/usr/bin/env node

var argv = require('yargs').argv
var port = argv.port || process.env.PORT || 5000
var app = require('../server')

app(port, function (err, reply) {
  if (err) {
    throw err
  }
  console.log('server listening on port: %s', reply.port)
})
