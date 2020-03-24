Feature: Create User
  In order to create a user
  As a client
  I want to be able to send a request to our API

  Client should be able to send a request to our API in order to create a user.
  Our API should also validate the structure of the payload 
  and respond with an error if it is invalid.

  Scenario: Empty payload

  If the client sends a POST request to /user with an unsupported payload,
  it should receive a response with a 4xx status code.

    Given a POST request to /user created with a generic empty payload
    When the client sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "Payload should not be empty"
