process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server.js');

describe('routes : steps', () => {

  describe('GET /api/steps', () => {
    it('should return all steps', (done) => {
      chai.request(server)
      .get('/api/steps')
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
        // key-value pair of {"data": [1 steps objects]}
        res.body.data.length.should.eql(1);
        // the first object in the data array should
        // have the right keys
        res.body.data[0].should.include.keys(
          'id', 'recipe_id', 'step_number', 'step_description'
        );
        done();
      });
    });
  });

  describe('GET /api/steps/:id', () => {
    it('should respond with a single step', (done) => {
      chai.request(server)
      .get('/api/steps/1')
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
        // key-value pair of {"data": 1 step object}
        res.body.data.should.include.keys(
          'id', 'recipe_id', 'step_number', 'step_description'
        );
        done();
      });
    });

    it('should throw an error if the step does not exist', (done) => {
      chai.request(server)
      .get('/api/steps/9999999')
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

  describe('POST /api/steps', () => {
    it('should return the steps that was added', (done) => {
      chai.request(server)
      .post('/api/steps')
      .send({
        recipe_id: 1,
        step_number: 1,
        step_description: 'Hola'
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
        // key-value pair of {"data": 1 step object}
        res.body["new_entry"].should.include.keys(
          'id', 'recipe_id', 'step_number', 'step_description'
        );
        done();
      });
    });

    it('should throw an error if payload is malformed', (done) => {
      chai.request(server)
      .post('/api/steps')
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
        // key-value pair of {"data": 1 step object}
        should.exist(res.body.message);
        done();
      });
    });
  });

  describe('PUT /api/steps', () => {
    it('should return the step that was updated', (done) => {
        chai.request(server)
        .put(`/api/steps/2`)
        .send({
          recipe_id: 1,
          step_number: 2,
          step_description: 'Pedro'
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
          // key-value pair of {"data": 1 step object}
          res.body["updated_entry"].should.include.keys(
            'id', 'recipe_id', 'step_number', 'step_description'
          );
          // ensure the step was in fact updated
          const newStep = res.body["updated_entry"];
          newStep.step_number.should.not.eql(1);
          done();
        });
      });

    it('should throw an error if step does not exist', (done) => {
        chai.request(server)
        .put(`/api/steps/99999999`)
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

  describe('DELETE /api/steps/:id', () => {

    it('should delete if the step exists', (done) => {
      chai.request(server)
        .delete(`/api/steps/2`)
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



    it('should throw an error if the step does not exist', (done) => {
      chai.request(server)
      .delete('/api/steps/9999999')
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
