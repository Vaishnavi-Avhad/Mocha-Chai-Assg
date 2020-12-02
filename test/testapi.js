var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');
var chaiHttp = require('chai-http');
var baseURL = 'http://localhost:5000/';

chai.use(chaiHttp);

it('Get All User', function(done) {
    request(baseURL+"Getusers" , function(error, response, body) {
        console.log(body);
        let bodyObject = JSON.parse(body);
        expect(bodyObject.success).to.equal(true);
        expect(bodyObject.data).to.be.an('array');
        done();
    });
});


it('Get Single user', function(done){
    request(baseURL+"user/15", function(error,response,body){
        console.log(body);
        let bodyObject = JSON.parse(body);
        expect(bodyObject.success).to.equal(true);
        expect(bodyObject.data).to.be.an('array');
        done();   
    })
})


it('Insert user', function(done){
    chai
    .request(baseURL)
    .post("adduser")
        .send({"ID":0,"FIRSTNAME":"VAISHNAVI","LASTNAME": "AVHAD","ADDRESS": "KOP","ORGNAME":"BLUEPINEAPPLE","SALARY": 30000})
        .end((err,res) =>{
            expect(res).to.have.status(200);
            done();
        });

})



it('Delete user', function(done){
    chai
    .request(baseURL)
    .delete("user/22")
        .end((err,res) =>{
            expect(res).to.have.status(200);
            done();
        });

})

it('Update user', function(done){
    chai
    .request(baseURL)
    .put("updateuser")
        .send({"ID":21,"FIRSTNAME":"ABC","LASTNAME": "XYZ","ADDRESS": "KOP","ORGNAME":"BLUEPINEAPPLE","SALARY": 30000})
        .end((err,res) =>{
            expect(res).to.have.status(200);
            done();
        });

})