// Spread Operator 
let response = [
    {id: 1, name: 'Apple Iphone 7', price: 500},
    {id: 2, name: 'OnePlus 3', price: 350},
    {id: 3, name: 'Oppo 20', price: 300},
    {id: 4, name: 'Samsung 5', price: 400},
    {id: 5, name: 'Realme 4', price: 370}
]

// make a copy 
let response_copy = [...response] // Right way 
response = response.filter(p=> p.price > 350)

console.log(response)
/**
 [
  { id: 1, name: 'Apple Iphone 7', price: 500 },
  { id: 4, name: 'Samsung 5', price: 400 },
  { id: 5, name: 'Realme 4', price: 370 }
]
 */

// lets check the copy response 
console.log(response_copy)

const newList = [...response_copy ,  {id: 6, name: 'Redmi', price: 280}]
console.log(newList)
console.log(response_copy)