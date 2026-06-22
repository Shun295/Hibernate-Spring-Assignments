import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useState } from "react";

import axios from "axios";

const ExecutiveCustomerAccounts = () => {

    const [customerId, setCustomerId] = useState("");

    const [accounts, setAccounts] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [error, setError] = useState("");
    let count=0;
    const searchAccounts =

        async (pageNumber = 0) => {

        try {

            setError("");

            const config = {

                headers: {

                    Authorization:
                        "Bearer " +
                        localStorage.getItem(
                            "token"
                        )

                }

            };

            const response =
                await axios.get(

                    `http://localhost:8080/api/account/customer/${customerId}?page=${pageNumber}&size=10`,
                    config
                );
            setAccounts(response.data.data
            );
            setTotalPages(
                response.data.totalPages
            );

            setPage(
                pageNumber
            );

        }
        catch(err){

            setAccounts([]);

            setError(
                err?.response?.data?.message
                ||
                "No Accounts Found"
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
                        Customer Accounts
                    </h1>

                    <div className="card mt-4">

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-8">

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Customer ID"
                                        value={customerId}
                                        onChange={(e) =>
                                            setCustomerId(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-md-4">

                                    <button
                                        className="btn btn-success w-100"
                                        onClick={() =>
                                            searchAccounts(0)
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

                        <div className="alert alert-danger mt-3">

                            {error}

                        </div>
                    }

                    {
                        accounts.length > 0 &&

                        <div className="card mt-4">

                            <div className="card-header">

                                <h4>
                                    Accounts
                                </h4>

                            </div>

                            <div className="card-body">

                                <table
                                    className="table table-bordered"
                                >

                                    <thead>

                                        <tr>

                                            <th>
                                                Account Number
                                            </th>

                                            <th>
                                                Type
                                            </th>

                                            <th>
                                                Balance
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Branch
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            accounts.map(

                                                account => (

                                                    <tr
                                                        key={
                                                            account.id
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                account.accountNumber
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                account.accountType
                                                            }
                                                        </td>

                                                        <td>
                                                            ₹
                                                            {
                                                                account.balance
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                account.accountStatus
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                account.branchName
                                                            }
                                                        </td>

                                                    </tr>

                                                )

                                            )
                                        }

                                    </tbody>

                                </table>

                                <nav>

                                    <ul className="pagination justify-content-center">

                                        <li
                                            className="page-item"
                                        >

                                            <button
                                                className="page-link"
                                               disabled={page === 0}
                                                onClick={() =>
                                                    searchAccounts(
                                                        page - 1
                                                    )
                                                }
                                            >
                                                Previous
                                            </button>

                                        </li>

                                        {

                                            [...Array(totalPages)]

                                            .map(

                                                (_, index) => (

                                                    <li
                                                        key={index}
                                                        className="page-item"
                                                    >

                                                        <button
                                                            className="page-link"
                                                            onClick={() =>
                                                                searchAccounts(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {
                                                                count=count+1
                                                            }
                                                        </button>

                                                    </li>

                                                )

                                            )

                                        }

                                        <li
                                            className="page-item"
                                        >

                                            <button
                                                className="page-link"
                                                disabled={page === totalPages - 1}
                                                onClick={() =>
                                                    searchAccounts(
                                                        page + 1
                                                    )
                                                }
                                            >
                                                Next
                                            </button>

                                        </li>

                                    </ul>

                                </nav>

                            </div>

                        </div>

                    }

                </div>

            </div>

        </div>

    );

};

export default ExecutiveCustomerAccounts;