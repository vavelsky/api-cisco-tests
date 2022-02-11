export let randomHugeCaseId = Math.floor(Math.random()* 100000)
export let randomNotExistingUser = Math.floor(Math.random()* 1000)

export const STRINGS = {
    userNotExist: `User with id ${randomNotExistingUser} does not exist`,
    emailNotBlank: 'email - must not be blank',
    firstNameNotBlank: 'firstName - must not be blank',
    lastNameNotBlank: 'lastName - must not be blank',
    titleNotBlank: 'title - must not be blank',
    severityNotBlank: 'severity - must not be null',
    descNotBlank: 'description - must not be blank',
    userAlreadyExist: `User with email 'maria.garcia@domain.com' already exists.`,
    caseNotExist: `Case with id ${randomHugeCaseId} not found`
}

export const ERROR_CODE_MEASSAGES = {
    BR: 'BAD_REQUEST',
    NF: 'NOT_FOUND'
}

export const STATUS_CASE = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED'
}