import { ERROR_CODE_MEASSAGES, STATUS_CASE, STRINGS } from "./strings";

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
                        "enum": [STRINGS.emailNotBlank, STRINGS.firstNameNotBlank, STRINGS.lastNameNotBlank]
                    }
                },
                "status": {
                    "type": "string",
                    "enum": [ERROR_CODE_MEASSAGES.BR]
                }
            }
    },

    schemaCasesOpen : {
            "type": "array",
            "items":{
                "type": "object",
                "required": [
                    "user",
                    "cases"
                ],
                "properties": {
                    "user": {
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
                    "cases": {
                        "type": "array",
                        "items":{
                            "type": "object",
                            "required": [
                                "id",
                                "title",
                                "description",
                                "severity",
                                "status",
                                "notes"
                            ],
                            "properties": {
                                "id": {
                                    "type": "integer"
                                },
                                "title": {
                                    "type": "string"
                                },
                                "description": {
                                    "type": "string"
                                },
                                "severity": {
                                    "type": "integer"
                                },
                                "status": {
                                    "enum": [STATUS_CASE.OPEN]
                                },
                                "notes": {
                                    "type": "array",
                                    "items":{
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "details"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "integer"
                                            },
                                            "details": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
    },

    schemaCasesClosed : {
            "type": "array",
            "items":{
                "type": "object",
                "required": [
                    "user",
                    "cases"
                ],
                "properties": {
                    "user": {
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
                    "cases": {
                        "type": "array",
                        "items":{
                            "type": "object",
                            "required": [
                                "id",
                                "title",
                                "description",
                                "severity",
                                "status",
                                "notes"
                            ],
                            "properties": {
                                "id": {
                                    "type": "integer"
                                },
                                "title": {
                                    "type": "string"
                                },
                                "description": {
                                    "type": "string"
                                },
                                "severity": {
                                    "type": "integer"
                                },
                                "status": {
                                    "enum": [STATUS_CASE.CLOSED]
                                },
                                "notes": {
                                    "type": "array",
                                    "items":{
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "details"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "integer"
                                            },
                                            "details": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
    },

    schemaCasesNoStatus : {
        "type": "object",
        "required": [
            "timestamp",
            "status",
            "error",
            "message",
            "path"
        ],
        "properties": {
            "timestamp": {
                "type": "string"
            },
            "status": {
                "type": "integer"
            },
            "error": {
                "type": "string"
            },
            "message": {
                "type": "string"
            },
            "path": {
                "type": "string"
            }
        }
    },

    schemaCasesUser : {
        "type": "array",
        "default": [],
        "items":{
            "type": "object",
            "required": [
                "id",
                "title",
                "description",
                "severity",
                "status",
                "notes"
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "severity": {
                    "type": "integer"
                },
                "status": {
                    "type": "string"
                },
                "notes": {
                    "type": "array",
                    "items":{
                        "type": "object",
                        "required": [
                            "id",
                            "details"
                        ],
                        "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "details": {
                                "type": "string"
                            }
                        }
                    }
    
                }
            }
        }
    },

    schemaUserCasesOpen : {
        "type": "array",
        "default": [],
        "items":{
            "type": "object",
            "required": [
                "id",
                "title",
                "description",
                "severity",
                "status",
                "notes"
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "severity": {
                    "type": "integer"
                },
                "status": {
                    "type": "string",
                    "enum": STATUS_CASE.OPEN
                },
                "notes": {
                    "type": "array",
                    "items":{
                        "type": "object",
                        "required": [
                            "id",
                            "details"
                        ],
                        "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "details": {
                                "type": "string"
                            }
                        }
                    }
    
                }
            }
        }
        
    },

    schemaUserCasesClosed : {
        "type": "array",
        "default": [],
        "items":{
            "type": "object",
            "required": [
                "id",
                "title",
                "description",
                "severity",
                "status",
                "notes"
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "severity": {
                    "type": "integer"
                },
                "status": {
                    "type": "string",
                    "enum": STATUS_CASE.CLOSED
                },
                "notes": {
                    "type": "array",
                    "items":{
                        "type": "object",
                        "required": [
                            "id",
                            "details"
                        ],
                        "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "details": {
                                "type": "string"
                            }
                        }
                    }
    
                }
            }
        }
        
    },

    schemaUserCaseId : {
        "type": "object",
        "required": [
            "id",
            "title",
            "description",
            "severity",
            "status",
            "notes"
        ],
        "properties": {
            "id": {
                "type": "integer"
            },
            "title": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "severity": {
                "type": "integer"
            },
            "status": {
                "type": "string"
            },
            "notes": {
                "type": "array"
            }
        }
    },

    schemaCaseRequestEmpty : {
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
                    "enum": [STRINGS.titleNotBlank, STRINGS.severityNotBlank, STRINGS.descNotBlank]
                }
            },
            "status": {
                "type": "string",
                "enum": [ERROR_CODE_MEASSAGES.BR]
            }
        }
    }
}