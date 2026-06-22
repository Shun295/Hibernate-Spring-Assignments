import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

const AdminAccountTypes = () => {

    const [type, setType] = useState("");

    const [initialDeposit,setInitialDeposit] =useState("");
    const [accountTypes,setAccountTypes] =useState([]);

    const [message, setMessage] = useState("");
    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem("token")
        }
    };

    const loadAccountTypes = async () => {
        try {

            const response = await axios.get(
                    "http://localhost:8080/api/account-type/all",
                    config
                );

            setAccountTypes(response.data );
        }
        catch(err){

            console.error(err);
        }

    };

    useEffect(() => {
        loadAccountTypes();

    }, []);

    const createAccountType = async () => {

        try {
            const body = {
                type,
                initialDeposit
            };
            await axios.post("http://localhost:8080/api/account-type/create",
                body,
                config
            );
            
            console.log(accountTypes);
            setMessage("Account Type Created Successfully");
            setType("");
            setInitialDeposit("");
            loadAccountTypes();

        }
        catch(err){

            //use the backend message if exists else return this
            setMessage(err.response.data.message
                ||
                "Unable to create account type"
            );
        }
    };
    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        Account Types
                    </h1>

                    {
                        //showing the div only if message has a value
                        message &&

                        <div
                            className="alert alert-info mt-3"
                        >
                            {message}
                        </div>
                    }

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                Create Account Type
                            </h4>

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6">

                                    <label>
                                        Account Type
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={type}
                                        onChange={(e) =>
                                            setType(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Initial Deposit
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={initialDeposit}
                                        onChange={(e) =>
                                            setInitialDeposit(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <button
                                className="btn btn-success mt-3"
                                onClick={
                                    createAccountType
                                }
                            >
                                Create
                            </button>

                        </div>

                    </div>

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                All Account Types
                            </h4>

                        </div>

                        <div className="card-body">

                            <table
                                className="table table-bordered"
                            >

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>
                                            Account Type
                                        </th>

                                        <th>
                                            Initial Deposit
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        accountTypes.map(

                                            accountType => (

                                                <tr
                                                    key={
                                                        accountType.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            accountType.id
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            accountType.AccountType
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {
                                                            accountType.initialDeposit
                                                        }
                                                    </td>

                                                </tr>

                                            )

                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AdminAccountTypes;