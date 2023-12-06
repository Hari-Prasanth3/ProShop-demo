import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true,
    },
    {
        name: 'Kishore',
        email: 'kishore@email.com',
        password: bcrypt.hashSync('123456',10),
       
    },
    {
        name: 'Jane',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456',10),
    },
];

export default users;