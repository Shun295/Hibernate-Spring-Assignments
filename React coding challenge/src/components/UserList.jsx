import axios from "axios";
import { useEffect, useState } from "react";

function UserList()
{
    const[users,setUsers]=useState([])
    const[err,setErr]=useState()
    useEffect(()=>
    {
        const getAllUsers=async()=>
        {
            try{
                const response=await axios.get("https://jsonplaceholder.typicode.com/users");
                console.log(response.data)
                setUsers(response.data);

            }
            catch(err)
            {
                setErr("No post")
            }
        }

        getAllUsers()
    },[])

    const onDelete=async(id)=>
    {
        try{
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            const temp=users.filter(user=>user.id!==id)
            setUsers(temp)
            alert("User removed")
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return (
    <div className="container mt-5">

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary fw-bold">
                        Users List
                    </h2>

                    <span className="badge bg-primary fs-6 px-3 py-2">
                        {users.length} Users
                    </span>
                </div>

                {err && (
                    <div className="alert alert-danger">
                        {err}
                    </div>
                )}

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead className="table-primary">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Company</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>

                                    <td className="fw-semibold">
                                        {user.name}
                                    </td>

                                    <td>{user.email}</td>

                                    <td>{user.phone}</td>

                                    <td>
                                        <span className="badge bg-light text-dark border">
                                            {user.company.name}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => onDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>
);
}

export default UserList;