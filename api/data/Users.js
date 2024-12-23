const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: bcrypt.hashSync('password123',10),
        isAdmin: true
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: bcrypt.hashSync('password456',10),
        isAdmin: false
    },
    {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: bcrypt.hashSync('password789',10),
        isAdmin: false
    }
];

module.exports = users;