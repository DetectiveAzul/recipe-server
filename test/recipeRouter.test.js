process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server.js');

describe('routes : recipes', () => {

  describe('GET /api/recipes', () => {
    it('should return all recipes', (done) => {
      chai.request(server)
      .get('/api/recipes')
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
        // key-value pair of {"data": [1 recipe objects]}
        res.body.data.length.should.eql(1);
        // the first object in the data array should
        // have the right keys
        res.body.data[0].should.include.keys(
          'id', 'name', 'description'
        );
        done();
      });
    });
  });

  describe('GET /api/recipes/:id', () => {
    it('should respond with a single recipe', (done) => {
      chai.request(server)
      .get('/api/recipes/1')
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
        // key-value pair of {"data": 1 recipe object}
        res.body.data.should.include.keys(
          'id', 'name', 'description'
        );
        done();
      });
    });

    it('should throw an error if the recipe does not exist', (done) => {
      chai.request(server)
      .get('/api/recipes/9999999')
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

  describe('POST /api/recipes', () => {
    it('should return the recipes that was added', (done) => {
      chai.request(server)
      .post('/api/recipes')
      .send({
        name: 'Pollo raro',
        description: 'New Creation',
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
        // key-value pair of {"data": 1 recipe object}
        res.body["new_entry"].should.include.keys(
          'id', 'name', 'description'
        );
        done();
      });
    });

    it('should throw an error if payload is malformed', (done) => {
      chai.request(server)
      .post('/api/recipes')
      .send({
        name: 'Pollo raro'
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
        // key-value pair of {"data": 1 recipe object}
        should.exist(res.body.message);
        done();
      });
    });
  });

  describe('PUT /api/recipes', () => {
    it('should return the recipe that was updated', (done) => {
        chai.request(server)
        .put(`/api/recipes/1`)
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
          // key-value pair of {"data": 1 recipe object}
          res.body["updated_entry"].should.include.keys(
            'id', 'name', 'description'
          );
          // ensure the recipe was in fact updated
          const newRecipe = res.body["updated_entry"];
          newRecipe.name.should.not.eql('Lasagna');
          done();
        });
      });

    it('should throw an error if recipe does not exist', (done) => {
        chai.request(server)
        .put(`/api/recipes/99999999`)
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

  describe('DELETE /api/recipes/:id', () => {

    it('should delete if the recipe exists', (done) => {
      chai.request(server)
        .delete(`/api/recipes/1`)
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



    it('should throw an error if the recipe does not exist', (done) => {
      chai.request(server)
      .delete('/api/recipes/9999999')
      .end((err, res) => {
      // there should not be an error
        should.exist(err);
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That movie does not exist."}
        res.body.message.should.eql('No entry was found');
        done();
      });
    });
  });

});
