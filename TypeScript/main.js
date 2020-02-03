"use strict";
exports.__esModule = true;
var can = "hello world";
console.log(can);
function hasName(obj) {
    return !!obj &&
        typeof (obj) === "object" && "name" in obj;
}
var myVariable = 30;
console.log(hasName(myVariable));
