//functions-traditional func and arrow function

//traditional ex1

function welcome(name)
{
    return `hello ${name}`;
}
console.log(welcome('aparna'))

//arrow

const fn=(name) => `hello ${name}`
console.log(fn('shruthi'))

//traditional-ex2
//sum of num

function sum(n1,n2)
{
    return n1+n2;
}
console.log(sum(2,3))

//arrow

const sum1=(n1,n2) => n1+n2
console.log(sum1(3,4))