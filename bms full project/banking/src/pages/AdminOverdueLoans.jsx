import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminOverdueLoans = () => {

    const navigate = useNavigate();

    const [loans, setLoans] =
        useState([]);

    const api =
        "http://localhost:8080/api/loan/overdue";


const [page, setPage] = useState(0);

const [totalPages, setTotalPages] =useState(0);

let count=0;
    useEffect(() => {

        const getOverdueLoans =
            async () => {

            try {

                const config_details = {

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
                        api,
                        config_details
                    );

                setLoans(
                    response.data
                );

            }
            catch (err) {

                console.log(
                    err?.response
                );

            }

        };

        getOverdueLoans();

    }, []);

    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                   <div className="page-header mb-4">

    <h1 className="page-title">
        Overdue Loans
    </h1>

    <p className="page-subtitle">
        Monitor overdue accounts and identify loans requiring immediate action
    </p>

</div>

<div className="row mb-4">

    <div className="col-md-4">

        <div className="dashboard-card-red">

            <h5>TOTAL OVERDUE LOANS</h5>

            <h2>
                {loans.length}
            </h2>

            <p>Loans Requiring Attention</p>

        </div>

    </div>

    <div className="col-md-4">

        <div className="dashboard-card-yellow">

            <h5>SEVERE CASES</h5>

            <h2>
                {
                    loans.filter(
                        loan =>
                            loan.daysOverdue > 30
                    ).length
                }
            </h2>

            <p>Over 30 Days Overdue</p>

        </div>

    </div>

    <div className="col-md-4">

        <div className="dashboard-card-blue">

            <h5>MONITOR CASES</h5>

            <h2>
                {
                    loans.filter(
                        loan =>
                            loan.daysOverdue <= 30
                    ).length
                }
            </h2>

            <p>Within 30 Days</p>

        </div>

    </div>

</div>

<div className="card account-request-card">

    <div className="card-header bg-white border-0">

        <div>

            <h3 className="form-title">
                Overdue Loan Directory
            </h3>

            <p className="form-subtitle">
                Loans requiring monitoring and collection efforts
            </p>

        </div>

    </div>

    <div className="card-body">

        <div className="table-responsive">

            <table className="table accounts-table">

                <thead>

                    <tr>

                        <th>Loan ID</th>
                        <th>Customer</th>
                        <th>Balance</th>
                        <th>EMI</th>
                        <th>Due Date</th>
                        <th>Overdue</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        loans.length > 0 ?

                        loans.map((loan) => (

                            <tr
                                key={
                                    loan.loanId
                                }
                            >

                                <td>

                                    <strong>
                                        LOAN-
                                        {
                                            loan.loanId
                                        }
                                    </strong>

                                </td>

                                <td>
                                    {
                                        loan.customerName
                                    }
                                </td>

                                <td className="balance-cell">

                                    ₹

                                    {
                                        Number(
                                            loan.balanceAmount
                                        ).toLocaleString()
                                    }

                                </td>

                                <td>

                                    ₹

                                    {
                                        Number(
                                            loan.emiAmount
                                        ).toLocaleString()
                                    }

                                </td>

                                <td>
                                    {
                                        loan.nextDueDate
                                    }
                                </td>

                                <td>

                                    <span
                                        className={

                                            loan.daysOverdue > 30

                                            ?

                                            "status-badge rejected"

                                            :

                                            loan.daysOverdue > 7

                                            ?

                                            "status-badge pending"

                                            :

                                            "status-badge reviewed"

                                        }
                                    >

                                        {
                                            loan.daysOverdue
                                        }

                                        {" "}Days

                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() =>
                                            navigate(
                                                `/admin/loan-monitoring/${loan.loanId}`
                                            )
                                        }
                                    >
                                        Monitor
                                    </button>

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center py-4"
                            >
                                No Overdue Loans Found
                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>

        <nav className="mt-4">

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
                                    {count=count+1}
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

export default AdminOverdueLoans;