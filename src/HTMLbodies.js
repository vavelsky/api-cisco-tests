import { faker } from '@faker-js/faker';

export const HTMLbodies = {
    bodyNewUserOK : {
        "firstName" : `${faker.name.firstName()}`,
        "lastName" : `${faker.name.lastName()}`,
        "email" : `${faker.internet.email()}`
      },
    
    bodyNewUserNoEmail : {
        "firstName" : `${faker.name.firstName()}`,
        "lastName" : `${faker.name.lastName()}`
      },

    bodyNewUserExistingEmail : {
        "firstName" : `${faker.name.firstName()}`,
        "lastName" : `${faker.name.lastName()}`,
        "email" : 'maria.garcia@domain.com'
      },
    
    bodyNewUserNoLast : {
        "firstName" : `${faker.name.firstName()}`,
        "email" : `${faker.internet.email()}`
      },

    bodyNewUserNoFirst : {
        "lastName" : `${faker.name.lastName()}`,
        "email" : `${faker.internet.email()}`
      },
    
    bodyNewUserEmptyStrings : {
        "firstName" : '',
        "lastName" : '',
        "email" : ''
      },

    bodyEmpty : {}
    
}