process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server.js');

describe('routes : measurements', () => {

  describe('GET /api/measurements', () => {
    it('should return all measurements', (done) => {
      chai.request(server)
      .get('/api/measurements')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": [1 measurement objects]}
        res.body.data.length.should.eql(2);
        // the first object in the data array should
        // have the right keys
        res.body.data[0].should.include.keys(
          'id', 'name'
        );
        done();
      });
    });
  });

  describe('GET /api/measurements/:id', () => {
    it('should respond with a single measurement', (done) => {
      chai.request(server)
      .get('/api/measurements/1')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 measurement object}
        res.body.data.should.include.keys(
          'id', 'name'
        );
        done();
      });
    });

    it('should throw an error if the measurement does not exist', (done) => {
      chai.request(server)
      .get('/api/measurements/9999999')
      .end((err, res) => {
        // there should an error
        should.exist(err);
        // there should be a 400 status code
        res.status.should.equal(400);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "No data returned from the query."}
        res.body.message.should.eql('No data returned from the query.');
        done();
      });
    });
  });

  describe('POST /api/measurements', () => {
    it('should return the measurements that was added', (done) => {
      chai.request(server)
      .post('/api/measurements')
      .send({
        name: 'lb'
      })
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 201 status code
        // (indicating that something was "created")
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 measurement object}
        res.body["new_entry"].should.include.keys(
          'id', 'name'
        );
        done();
      });
    });

    it('should throw an error if payload is malformed', (done) => {
      chai.request(server)
      .post('/api/measurements')
      .send({
        description: 'Pollo raro'
      })
      .end((err, res) => {
        // there should be no errors
        should.exist(err);
        // there should be a 400 status code
        // (indicating that something gone wrong)
        res.status.should.equal(400);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a message key
        // key-value pair of {"data": 1 measurement object}
        should.exist(res.body.message);
        done();
      });
    });
  });

  describe('PUT /api/measurements', () => {
    it('should return the measurement that was updated', (done) => {
        chai.request(server)
        .put(`/api/measurements/3`)
        .send({
          name: 'Greok'
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 measurement object}
          res.body["updated_entry"].should.include.keys(
            'id', 'name'
          );
          // ensure the measurement was in fact updated
          const newMeasurement = res.body["updated_entry"];
          newMeasurement.name.should.not.eql('lb');
          done();
        });
      });

    it('should throw an error if measurement does not exist', (done) => {
        chai.request(server)
        .put(`/api/measurements/99999999`)
        .send({
          name: 'Greok'
        })
        .end((err, res) => {
          // there should be no errors
          should.exist(err);
          // there should be a 400 status code
          res.status.should.equal(400);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a
          // key-value pair of {"message": "No data returned from the query."}
          res.body.message.should.eql('No data returned from the query.');
          done();
        });
      });
    });

  describe('DELETE /api/measurements/:id', () => {

    it('should delete if the measurement exists', (done) => {
      chai.request(server)
        .delete(`/api/measurements/3`)
        .end((err, res) => {
        // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          done();
          });
        });



    it('should throw an error if the measurement does not exist', (done) => {
      chai.request(server)
      .delete('/api/measurements/9999999')
      .end((err, res) => {
      // there should be an error
        should.exist(err);
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "No entry was found"}
        res.body.message.should.eql('No entry was found');
        done();
      });
    });
  });

});
