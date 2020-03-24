const superagent = require('superagent')
const assert = require('assert')
const { When, Then, Given } = require('cucumber')

// Given('a POST request to /user created with a generic empty payload', callback => {
//   callback(null, 'pending')
// })
const given = {}

Given('a POST request to /user created with a generic empty payload', function () {
  // By default superagent creates an empty payload when none is given.
  given.request = superagent('POST', `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/user`)
})

When('the client sends the request', function (callback) {
  given.request
    .then(response => {
      given.response = response.res
      callback()
    })
    .catch(errResponse => {
      given.response = errResponse.response
      callback()
    })
})

Then('our API should respond with a {int} HTTP status code', function (int) {
  assert.strictEqual(given.response.statusCode, int)
})

Then('the payload of the response should be a JSON object', function () {
  const { text, headers } = given.response
  const contentType = headers && (headers['Content-Type'] || headers['content-type'])
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Response not of content application/json')
  }

  try {
    given.payload = JSON.parse(text)
  } catch (parseError) {
    throw new Error('Response is not a valid JSON object')
  }
})

Then('contains a message property which says {string}', function (string) {
  assert.strictEqual(given.payload.message, string)
})
