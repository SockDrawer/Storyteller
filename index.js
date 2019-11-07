const Ajv = require('ajv')
const ajv = new Ajv(); 
const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://storytellet.sockdrawer.dev/schema/user.json",
  "type": "object",
  "title": "The User Schema",
  "required": [
    "username",
    "id",
  ],
  "properties": {
    "username": {
      "$id": "/properties/username",
      "type": "string",
      "title": "The User Name",
      "default": "",
      "pattern": "^(.{5,})$"
    },
    "id": {
      "$id": "/properties/id",
      "type": "integer",
      "title": "The User Id",
      "default": 0,
      "exclusiveMinimum": 0
    }
  }
}
const data = {
  username: "admin",
  active: true,
  id: 1
}
const validate = ajv.addSchema(schema, "user");
const ajvschema = ajv.getSchema("https://sockdrawer.io/storyteller/schema/user.json");
const ajvschema2 = ajv.getSchema("user");
console.log(ajvschema)
console.log(ajvschema2.schema)
//
//const valid = ajv.getSchema("https://sockdrawer.io/storyteller/schema/user.json");
//if (!valid) console.log(validate.errors);
//
//console.log()