'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        nik: '202020',
        fullName: 'Nurul Ahyar',
        email: 'ahyar@gmail.com',
        password: 'ahyar123',
        position: 0,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nik: '202021',
        fullName: 'Benny',
        email: 'benny@gmail.com',
        password: 'benny123',
        position: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nik: '202022',
        fullName: 'Galih',
        email: 'galih@gmail.com',
        password: 'galih123',
        position: 1,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
