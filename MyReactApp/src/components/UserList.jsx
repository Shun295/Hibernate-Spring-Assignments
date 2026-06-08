import axios from "axios";
import { useEffect, useState } from "react";

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    const url = "https://jsonplaceholder.typicode.com/users";

    useEffect(() => {

        const getAllUsers = async () => {
            try {
                const response = await axios.get(url);
                setUsers(response.data);
            }
            catch (err) {
                setErrMsg("Problem loading API Data " + err);
            }
        };
        getAllUsers();

    }, []);

    return (
        <div className="container">
            <h1>All Users</h1>
            {errMsg && <p>{errMsg}</p>}

            {
                users.map((u) => (

                    <div className="row mt-3" key={u.id}>
                        <div className="col-lg-12">

                            <div className="card">

                                <div className="card-body">

                                    <p><b>Id:</b> {u.id}</p>

                                    <p><b>Name:</b> {u.name}</p>

                                    <p><b>Username:</b> {u.username}</p>

                                    <p><b>Email:</b> {u.email}</p>

                                    <p><b>Phone:</b> {u.phone}</p>

                                    <p><b>Website:</b> {u.website}</p>

                                    <p>
                                        <b>City:</b> {u.address.city}
                                    </p>

                                    <p>
                                        <b>Company:</b> {u.company.name}
                                    </p>

                                </div>

                            </div>

                        </div>
                    </div>

                ))
            }

        </div>
    );
};

export default UserList;