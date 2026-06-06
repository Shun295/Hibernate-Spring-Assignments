//simulating an api call-promise and async await method

const response = [
    { id: 1, name: "John", department: "IT", salary: 60000 },
    { id: 2, name: "Sarah", department: "HR", salary: 45000 },
    { id: 3, name: "Mike", department: "IT", salary: 70000 },
    { id: 4, name: "Emma", department: "Finance", salary: 55000 },
    { id: 5, name: "David", department: "HR", salary: 50000 }
];

function getByid(id)
{
    return new Promise((resolve,reject)=>
    {
        setTimeout(()=>
        {
            const employee=response.find(e=>e.id===id)
            if(employee !== undefined)
            {
                resolve(employee)
            }
            else{
                reject('product not found')
            }
        },1);
    })
}

//async await

const getByIdHandle = async(id)=>
{
    try{
        const e=await getByid(id)
        console.log(`Employee Found: ${e.id} , ${e.name} , ${e.department} , ${e.salary}`)
    }
    catch(err)
    {
        console.log(`Error: ${err}`)
    }
}

getByIdHandle(2)
getByIdHandle(100)

