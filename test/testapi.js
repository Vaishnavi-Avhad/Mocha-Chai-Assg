var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');
var chaiHttp = require('chai-http');
const mysqlConnection = require("../src/dbconnection");

var baseURL = 'http://localhost:5000/';

chai.use(chaiHttp);
var id;
var count =1;

describe('hooks steps', function () {
    before(function () {
        mysqlConnection.query("INSERT INTO user( FIRSTNAME, LASTNAME, ADDRESS, ORGNAME, SALARY) VALUES ('Sanjana','Avhad','kop','Bluepineapple',30000)",function(err,result){
            if(err) throw err;
            id= result.insertId;
        });
    });

    beforeEach(function(){
        console.log("Checking for:"+count );
        ++count;
    });

 
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
        request(baseURL+"user/"+id, function(error,response,body){
            console.log(body);
            let bodyObject = JSON.parse(body);
            expect(bodyObject.success).to.equal(true);
            expect(bodyObject.data).to.be.an('array');
            done();   
        })
    })


    it('Update user', function(done){
        chai
        .request(baseURL)
        .put("updateuser")
            .send({"ID":id,"FIRSTNAME":"ABC","LASTNAME": "XYZ","ADDRESS": "KOP","ORGNAME":"BLUEPINEAPPLE","SALARY": 30000})
            .end((err,res) =>{
                expect(res).to.have.status(200);
                done();
                  });
    })

    it('Delete user', function(done){
        chai
        .request(baseURL)
        .delete("user/"+id)
            .end((err,res) =>{
                expect(res).to.have.status(200);
                done();
            });
    
    })
})


/*
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

*/
