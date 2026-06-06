/**
 Array Method in JS 
 1. forEach
 2. filter
 3. sort
 4. map
 5. Reduce
 6. find 
 */

 const employees = [
    { id: 1, name: "John", department: "IT", salary: 60000 },
    { id: 2, name: "Sarah", department: "HR", salary: 45000 },
    { id: 3, name: "Mike", department: "IT", salary: 70000 },
    { id: 4, name: "Emma", department: "Finance", salary: 55000 },
    { id: 5, name: "David", department: "HR", salary: 50000 }
];

//forEach
employees.forEach(e=>console.log(e))

//filter-name that are in it dept
const itEmp=employees.filter(e=>e.department === "IT")
console.log(itEmp)

//sort the names in ascending order
const sortedNames=employees.sort((a,b)=>a.name.localeCompare(b.name))
console.log(sortedNames)

/*Returns a negative value if a.name comes before b.name
Returns a positive value if a.name comes after b.name
Returns 0 if they are equal
*/
//for descending -employees.sort((a, b) => b.name.localeCompare(a.name));

//map-only names
const empDept=employees.map(e=>e.department)
console.log(empDept)

//map only names in sorting means
const sortedOnlyName=employees.map(e=>e.name).sort()
console.log(sortedOnlyName)

//Reduce -sum of the salary of dept
const total=employees.reduce((sum,e)=>sum+e.salary,0)
console.log(total)

//if i need salry of It dept only -first filter then reduce
const totalItSalary = employees
    .filter(e => e.department === "IT")
    .reduce((sum, e) => sum + e.salary, 0);

console.log(totalItSalary);

//find By Id-first only hr dept 
const empById=employees.find(e=>e.id===3)
console.log(empById === undefined? "Employee not found with this id": empById)
//find returns only the first matching element 