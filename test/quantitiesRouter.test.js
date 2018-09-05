process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server.js');

describe('routes : quantities', () => {

  describe('GET /api/quantities', () => {
    it('should return all quantities', (done) => {
      chai.request(server)
      .get('/api/quantities')
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
        // key-value pair of {"data": [1 quantity objects]}
        res.body.data.length.should.eql(1);
        // the first object in the data array should
        // have the right keys
        res.body.data[0].should.include.keys(
          'id', 'recipe_id', 'ingredient_id', 'measurement_id', 'ingredient_quantity'
        );
        done();
      });
    });
  });

  describe('GET /api/quantities/:id', () => {
    it('should respond with a single quantity', (done) => {
      chai.request(server)
      .get('/api/quantities/1')
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
        // key-value pair of {"data": 1 quantity object}
        res.body.data.should.include.keys(
          'id', 'recipe_id', 'ingredient_id', 'measurement_id', 'ingredient_quantity'
        );
        done();
      });
    });

    it('should throw an error if the quantity does not exist', (done) => {
      chai.request(server)
      .get('/api/quantities/9999999')
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

  describe('POST /api/quantities', () => {
    it('should return the quantities that was added', (done) => {
      chai.request(server)
      .post('/api/quantities')
      .send({
        recipe_id: 1,
        ingredient_id: 1,
        measurement_id: 1,
        ingredient_quantity: 20.00
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
        // key-value pair of {"data": 1 quantity object}
        res.body["new_entry"].should.include.keys(
          'id', 'recipe_id', 'ingredient_id', 'measurement_id', 'ingredient_quantity'
        );
        done();
      });
    });

    it('should throw an error if payload is malformed', (done) => {
      chai.request(server)
      .post('/api/quantities')
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
        // key-value pair of {"data": 1 quantity object}
        should.exist(res.body.message);
        done();
      });
    });
  });

  describe('PUT /api/quantities', () => {
    it('should return the quantity that was updated', (done) => {
        chai.request(server)
        .put(`/api/quantities/2`)
        .send({
          ingredient_quantity: 5.00
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
          // key-value pair of {"data": 1 quantity object}
          res.body["updated_entry"].should.include.keys(
            'id', 'recipe_id', 'ingredient_id', 'measurement_id', 'ingredient_quantity'
          );
          // ensure the quantity was in fact updated
          const newQuantity = res.body["updated_entry"];
          newQuantity.ingredient_quantity.should.not.eql(20.00);
          done();
        });
      });

    it('should throw an error if quantity does not exist', (done) => {
        chai.request(server)
        .put(`/api/quantities/99999999`)
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

  describe('DELETE /api/quantities/:id', () => {

    it('should delete if the quantity exists', (done) => {
      chai.request(server)
        .delete(`/api/quantities/2`)
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



    it('should throw an error if the quantity does not exist', (done) => {
      chai.request(server)
      .delete('/api/quantities/9999999')
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
