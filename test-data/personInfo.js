import { faker } from "@faker-js/faker";

const firstName= faker.person.firstName()
const lastName= faker.person.lastName()
const email = faker.internet.email()
const message=faker.lorem.sentences(2, '\n')

export {firstName, lastName, email, message}


