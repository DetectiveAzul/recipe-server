process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server.js');

describe('routes : ingredients', () => {

  describe('GET /api/ingredients', () => {
    it('should return all ingredients', (done) => {
      chai.request(server)
      .get('/api/ingredients')
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
        // key-value pair of {"data": [1 ingredient objects]}
        res.body.data.length.should.eql(1);
        // the first object in the data array should
        // have the right keys
        res.body.data[0].should.include.keys(
          'id', 'name'
        );
        done();
      });
    });
  });

  describe('GET /api/ingredients/:id', () => {
    it('should respond with a single ingredient', (done) => {
      chai.request(server)
      .get('/api/ingredients/1')
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
        // key-value pair of {"data": 1 ingredient object}
        res.body.data.should.include.keys(
          'id', 'name'
        );
        done();
      });
    });

    it('should throw an error if the ingredient does not exist', (done) => {
      chai.request(server)
      .get('/api/ingredients/9999999')
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

  describe('POST /api/ingredients', () => {
    it('should return the ingredients that was added', (done) => {
      chai.request(server)
      .post('/api/ingredients')
      .send({
        name: 'Pollo raro'
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
        // key-value pair of {"data": 1 ingredient object}
        res.body["new_entry"].should.include.keys(
          'id', 'name'
        );
        done();
      });
    });

    it('should throw an error if payload is malformed', (done) => {
      chai.request(server)
      .post('/api/ingredients')
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
        // key-value pair of {"data": 1 ingredient object}
        should.exist(res.body.message);
        done();
      });
    });
  });

  describe('PUT /api/ingredients', () => {
    it('should return the ingredient that was updated', (done) => {
        chai.request(server)
        .put(`/api/ingredients/2`)
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
          // key-value pair of {"data": 1 ingredient object}
          res.body["updated_entry"].should.include.keys(
            'id', 'name'
          );
          // ensure the ingredient was in fact updated
          const newIngredient = res.body["updated_entry"];
          newIngredient.name.should.not.eql('Pollo raro');
          done();
        });
      });

    it('should throw an error if ingredient does not exist', (done) => {
        chai.request(server)
        .put(`/api/ingredients/99999999`)
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

  describe('DELETE /api/ingredients/:id', () => {

    it('should delete if the ingredient exists', (done) => {
      chai.request(server)
        .delete(`/api/ingredients/2`)
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



    it('should throw an error if the ingredient does not exist', (done) => {
      chai.request(server)
      .delete('/api/ingredients/9999999')
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
