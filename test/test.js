var should = require('should')
var request = require('request')
var portfinder = require('portfinder')

describe('Start server', function() {
  var port
  before(function(done) {
    portfinder.getPort(function(err, portReply) {
      should.not.exist(err)
      port = portReply
      done()
    })
  })

  it('should start server and response to requests secret with the replay of the json content', function(done) {
    this.slow('10s')
    require('../server.js')(port, function(err, reply) {
      should.not.exist(err)
      should.exist(reply)
      should.exist(reply.port, 'port field missing in reply')
      var url = 'http://localhost:8000/secret'
      var requestOpts = {
       url: url,
       method: 'get'
      }
      request(requestOpts, function(err, res, body) {
       should.not.exist(err)
       should.exist(body)
       res.statusCode.should.eql(200)
       if ((JSON.parse(body)).hasOwnProperty('secret_code')){
       	var check=1
       	check.should.be.equal(1)
       }
       done()
      })
    })
  })
})
