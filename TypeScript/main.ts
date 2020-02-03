export{};
var can = "hello world";
console.log(can);
function hasName(obj:any):obj is{name:string}{
    return !!obj && 
    typeof (obj) === "object" && "name" in obj; 
}
let myVariable:any = 30;
console.log(hasName(myVariable));
