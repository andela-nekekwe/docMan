const faker = require('faker');

module.exports = {
    role: {
        title: 'author'
    },

    adminRole: {
        title: 'admin'
    },

    regularRole: {
        title: 'regular'
    },

    regularUser: {
        firstname: faker.name.findName(),
        lastname: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    },

    adminUser: {
        firstname: faker.name.findName(),
        lastname: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }, 

    
}