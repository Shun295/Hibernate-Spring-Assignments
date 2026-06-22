import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

const AdminAllAccounts = () => {

    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    let count=0;
    useEffect(() => {
        loadAccounts();
    }, [page]);
    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem("token" )
        }
    };

    const loadAccounts =async () => {
            try {

                const response =
                    await axios.get(
                        `http://localhost:8080/api/account/all?page=${page}&size=10`,
                        config

                    );

                setAccounts(response.data.data);

                setTotalPages(response.data.totalPages);

            }
            catch (err) {

                console.error(err);
            }
        };

    const activateAccount =async (accountId) => {
            await axios.put(
                `http://localhost:8080/api/account/${accountId}/activate`,
                {},
                config
            );
            loadAccounts();
        };

    const blockAccount =
        async (accountId) => {
            await axios.put(
                `http://localhost:8080/api/account/${accountId}/block`,
                {},
                config
            );
            //after blocking this runs
            loadAccounts();
        };

    const closeAccount =
        async (accountId) => {
            await axios.put(
                `http://localhost:8080/api/account/${accountId}/close`,
                {},
                config
            );
            loadAccounts();
        };

    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Account Directory
                        </h1>

                        <p className="page-subtitle">
                            View and manage all customer accounts across branches
                        </p>

                    </div>

                    <div className="card account-request-card">

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

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

                                        <th>
                                            Actions
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
                                                        <strong>
                                                            ACC-{account.id}
                                                        </strong>
                                                    </td>

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

                                                    <td className="balance-cell">
                                                        ₹
                                                        {Number(
                                                            account.balance
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={
                                                                account.accountStatus === "ACTIVE"
                                                                    ? "status-active"
                                                                    : account.accountStatus === "BLOCKED"
                                                                        ? "status-blocked"
                                                                        : "status-closed"
                                                            }
                                                        >
                                                            {account.accountStatus}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {
                                                            account.branchName
                                                        }
                                                    </td>

                                                    <td>

                                                        <div className="d-flex gap-2">
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() =>
                                                                    activateAccount(
                                                                        account.id
                                                                    )
                                                                }
                                                            >
                                                                Activate
                                                            </button>

                                                            <button
                                                                className="btn btn-warning btn-sm"
                                                                onClick={() =>
                                                                    blockAccount(
                                                                        account.id
                                                                    )
                                                                }
                                                            >
                                                                Block
                                                            </button>

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() =>
                                                                    closeAccount(
                                                                        account.id
                                                                    )
                                                                }
                                                            >
                                                                Close
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )

                                        )
                                    }

                                </tbody>

                            </table>

                            <nav aria-label="Page navigation example" className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={page === 0}
                                            onClick={() => setPage(page - 1)}
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {
                                        Array.from({ length: totalPages }).map((_, index) => (

                                            <li
                                                key={index}
                                                className={`page-item ${page === index ? "active" : ""
                                                    }`}
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() => setPage(index)}
                                                >
                                                    {count=count + 1}
                                                </button>

                                            </li>

                                        ))
                                    }

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={page === totalPages - 1}
                                            onClick={() => setPage(page + 1)}
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

export default AdminAllAccounts;