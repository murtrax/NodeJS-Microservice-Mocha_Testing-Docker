const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

let jwtToken;

describe('microservice API', () => {
  //test login route
  describe('post /api/user/login', () => {
    it('It should return a valid JSON web token', (done) => {
      chai
        .request(app)
        .post('/api/user/login')
        .set('content-type', 'application/json')
        .send({ username: 'test', password: 'test' })
        .end((err, response) => {
          jwtToken = response.body.data.token;
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.status.should.equal('success');
          response.body.data.should.have.property('token');
          done();
        });
    });
  });
  //   test the JSON patch route
  describe('post /api/jsonPatch', () => {
    it('Should return a a valid obj for the enclosed JSON patch command', (done) => {
      chai
        .request(app)
        .patch('/api/jsonPatch')
        .set({ Authorization: `Bearer ${jwtToken}` })
        .set('content-type', 'application/json')
        .send({
          obj: {
            firstName: 'Albert',
            contactDetails: { phoneNumbers: [] },
          },
          patchObj: {
            op: 'replace',
            path: '/firstName',
            value: 'Joachim',
          },
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.status.should.equal('success');
          response.body.data.obj.should.have.property('firstName');
          response.body.data.obj.firstName.should.equal('Joachim');
          done();
        });
    });
  });
  describe('post /api/thumbnail', () => {
    it('Should return a 50x50 thumbnail image for the image corresponding to the given URL', (done) => {
      chai
        .request(app)
        .post('/api/thumbnail')
        .set({ Authorization: `Bearer ${jwtToken}` })
        .set('content-type', 'application/json')
        .send({
          url:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    //test the thumbnail route
  });
});
