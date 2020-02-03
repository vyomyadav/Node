/*const {assert} = require("chai");
const app = require("../app");

describe("App",function(){
    it("app should return he",function(){
        assert.equal(app(),"Hello");
    });
});*/
const {assert} = require("chai");
//const {sayhello} = require("../app");
//const {addnumber} = require("../app");
const app = require("../app");
describe("App",function(){
    it("app should return jojo",function(){
        let result = app.sayhello();
        assert.equal(result,"Jojo");
    });
    it('app type check',function(){
        let result = app.sayhello();
        assert.typeOf(result,"string");
    });
    it("app check value above 20",function(){
        let result = app.addnumber(34,45);
        assert.isAbove(result,20);
    });
});