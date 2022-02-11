export const SCHEMAS = {
    schemaUsers : {
        "type": "array",
        "items":{
            "type": "object",
            "required": [
                "id",
                "firstName",
                "lastName",
                "email"
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                }
            }
        }
    },

    schemaUser : {
        "type": "object",
            "required": [
                "id",
                "firstName",
                "lastName",
                "email"
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                }
            }
        },
    
        schemaNewUserEmptyBody : {
            "type": "object",
            "required": [
                "messages",
                "status"
            ],
            "properties": {
                "messages": {
                    "type": "array",
                    "items":{
                        "type": "string",
                        "enum": ["email - must not be blank", "firstName - must not be blank", "lastName - must not be blank"]
                    }
                },
                "status": {
                    "type": "string",
                    "enum": ["BAD_REQUEST"]
                }
            }
        }
}