const request = require('supertest')

const { createApp } = require('../app');
const { appDataSource } =require('../models/index'); 

describe('signUp', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await appDataSource.query('TRUNCATE users');
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
    await appDataSource.destroy();
  });

  test('SUCCESS: CREATE_USER', async () => {
    await request(app)
    .post('/users/signup')
    .send({ 
      email:'wecodetest@email.com',
      password:'Rightpassword1!',
      name:'Kimcode'
    })
    .expect(201);
  });

  test('Failed: invalid email', async () => {
    await request(app)
    .post('/users/signup')
    .send({ 
      email:'wecodetestemail.com',
      password:'Rightpassword1!',
      name:'Kimcode'
    })
    .expect(400)
    .expect({ message: 'INVALID_EMAIL'});
  });

  test('Falied: duplicated email', async () => {
    await request(app)
    .post('/users/signup')
    .send({
      email:'wecodetest@email.com',
      password:'Rightpassword1!',
      name:'Kimcode'
   })
    .expect(401)
    .expect({message:'DUPLICATED_EMAIL'});
  });
  
  test('Failed: invalid password', async () => {
    await request(app)
    .post('/users/signup')
    .send({ 
      email:'wecodetest@email.com',
      password:'wrongpassword',
      name:'Kimcode' 
    })
    .expect(401)
    .expect({ message: 'INVALID_PASSWORD'})
  });
});




describe('signIn', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await appDataSource.query('TRUNCATE users');
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
    await appDataSource.destroy();
  });

  test('Success: signIn success', async () =>{
    await request(app)
    .post('/user/signin')
    .send({
      email:'wecodetest@email.com',
      password:'Rightpassword1!'
    })
    .expect(200)
    .expect({ message: 'SIGNIN_SUCCESS'});
  });

  test('Failed: wrong email', async () => {
    await request(app)
    .post('/user/signin')
    .send({
      email:'wrongemail@email.com',
      password:'Rightpassword1!'
    })
    .expect(400)
    .expect({ message: 'USER_DOES_NOT_EXIST'});
  });

  test('Failed: wrong password', async () => {
    await request(app)
    .post('/user/signin')
    .send({
      email:'wecodetest@email.com',
      password:'Rightpassword1'
    })
    .expect(401)
    .expect({ message: 'INVALID_PASSWORD'});
  });

});

