import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useState } from "react";

import axios from "axios";

const ExecutiveAccountSearch = () => {

    const [accountNumber, setAccountNumber] =useState("");
    const [account, setAccount] =useState(null);

    const [error, setError] =useState("");

    const searchAccount =
        async () => {
        try {
            setError("");
            const config = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            };
            const response =
                await axios.get(
                    `http://localhost:8080/api/account/number/${accountNumber}`,
                    config
                );

            setAccount(response.data);

        }
        catch(err){

            setAccount(null);

            setError(
                err?.response?.data?.message
                ||
                "Account Not Found"
            );

        }

    };

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        Search Account
                    </h1>

                    <div className="card mt-4">

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-8">

                                    <input
                                        type="text"
                                        className="form-control"
                                       required
                                        placeholder="Enter Account Number"
                                        value={accountNumber}
                                        onChange={(e) =>
                                            setAccountNumber(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-md-4">

                                    <button
                                        className="btn btn-success w-100"
                                        onClick={
                                            searchAccount
                                        }
                                    >
                                        Search
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    {
                        error &&

                        <div
                            className="alert alert-danger mt-3"
                        >
                            {error}
                        </div>
                    }

                    {
                        account &&

                        <div
                            className="card mt-4"
                        >

                            <div
                                className="card-header"
                            >

                                <h4>
                                    Account Details
                                </h4>

                            </div>

                            <div
                                className="card-body"
                            >

                                <p>

                                    <strong>
                                        Account Number :
                                    </strong>

                                    {" "}

                                    {
                                        account.accountNumber
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Account Type :
                                    </strong>

                                    {" "}

                                    {
                                        account.accountType
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Balance :
                                    </strong>

                                    {" "}
                                    ₹
                                    {
                                        account.balance
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Status :
                                    </strong>

                                    {" "}

                                    {
                                        account.accountStatus
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Branch :
                                    </strong>

                                    {" "}

                                    {
                                        account.branchName
                                    }

                                </p>

                            </div>

                        </div>

                    }

                </div>

            </div>

        </div>

    );

};

export default ExecutiveAccountSearch;