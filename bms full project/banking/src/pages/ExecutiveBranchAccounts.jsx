import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

const ExecutiveBranchAccounts = () => {

    const [accounts, setAccounts] = useState([]);
    const [page, setPage] =useState(0);
    const [totalPages,setTotalPages] =useState(0);
    let count=0;
    useEffect(() => {
        loadAccounts();
    }, [page]);

    const loadAccounts =
        async () => {
        try {
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

                    `http://localhost:8080/api/account/my-branch?page=${page}&size=10`,

                    config

                );

            setAccounts(
                response.data.data
            );

            setTotalPages(
                response.data.totalPages
            );

        }
        catch(err){

            console.error(err)
        }
    };

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        Accounts In My Branch
                    </h1>

                    <div className="card mt-4">

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
                                                setPage(
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
                                                            setPage(
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
                                                setPage(
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

                </div>

            </div>

        </div>

    );

};

export default ExecutiveBranchAccounts;