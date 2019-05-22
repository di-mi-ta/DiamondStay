const User = require('../models/user');

User.create({
    username: 'vtcuong',
    password: '7',
    firstName: 'Cuong',
    lastName: 'Van',
    email: 'cuongvtien@gmail.com',
    phone: '0989123456',
    typeUser: 0,
});

User.create({
    username: 'dimita',
    password: '7',
    firstName: 'Tan',
    lastName: 'Dinh',
    email: 'beta.dimita@gmail.com',
    phone: '0392516548',
    typeUser: 0,
});

User.create({
    username: 'admin',
    password: '7',
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'beta.dimita@gmail.com',
    phone: '0392516548',
    typeUser: 2,
});

User.create({
    username: 'host',
    password: '7',
    firstName: 'Chu',
    lastName: 'Nha',
    email: 'chunha@gmail.com',
    phone: '0392516548',
    typeUser: 1,
});
