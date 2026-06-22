import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ExecutiveLoanMonitoring = () => {

    const { loanId } = useParams();

    const [repayments, setRepayments] = useState([]);
    const [loan, setLoan] = useState(null);

    const [page, setPage] =useState(0);

    const [totalPages, setTotalPages] =useState(0);


    let count=0;
    const api =
        `http://localhost:8080/api/repayment/loan/${loanId}`;
    const monitoringApi =
        `http://localhost:8080/api/loan/monitoring/${loanId}`;

    useEffect(() => {

        const getLoanMonitoring =
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
                            monitoringApi,
                            config_details
                        );

                    setLoan(
                        response.data
                    );

                }
                catch (err) {

                    console.log(
                        err?.response
                    );

                }

            };

        const getRepayments =
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

                            `${api}?page=${page}&size=10`,

                            config_details

                        );

                    setRepayments(
                        response.data.data
                    );

                    setTotalPages(
                        response.data.totalPages
                    );

                }
                catch (err) {

                    console.error(err)

                }

            };

        getLoanMonitoring();
        getRepayments();

    }, [page, loanId]);

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        Loan Monitoring
                    </h1>

                    {
                        loan && (

                            <div className="card">

                                <div className="card-header">

                                    <h4>
                                        Loan Monitoring
                                    </h4>

                                </div>

                                <div className="card-body">

                                    <div className="row">

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Customer
                                                </strong>

                                                <br />

                                                {
                                                    loan.customerName
                                                }

                                            </p>

                                        </div>

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Loan ID
                                                </strong>

                                                <br />

                                                {
                                                    loan.loanId
                                                }

                                            </p>

                                        </div>

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Balance
                                                </strong>

                                                <br />

                                                ₹
                                                {
                                                    loan.balanceAmount
                                                }

                                            </p>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    EMI
                                                </strong>

                                                <br />

                                                ₹
                                                {
                                                    loan.emiAmount
                                                }

                                            </p>

                                        </div>

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Next Due Date
                                                </strong>

                                                <br />

                                                {
                                                    loan.nextDueDate
                                                }

                                            </p>

                                        </div>

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Status
                                                </strong>

                                                <br />

                                                <span
                                                    className={
                                                        loan.status ===
                                                            "OVERDUE"

                                                            ?

                                                            "badge bg-danger"

                                                            :

                                                            "badge bg-success"
                                                    }
                                                >

                                                    {
                                                        loan.status
                                                    }

                                                </span>

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    }

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                Repayment Transactions
                            </h4>

                        </div>

                        <div className="card-body">

                            <table className="table table-bordered">

                                <thead>

                                    <tr>

                                        <th>
                                            Repayment ID
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Payment Mode
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Reference
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        repayments.length > 0 ?

                                            repayments.map(
                                                (
                                                    repayment
                                                ) => (

                                                    <tr
                                                        key={
                                                            repayment.repaymentId
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                repayment.repaymentId
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                repayment.repaymentAmount
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                repayment.paymentMode
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                repayment.repaymentDate
                                                            }
                                                        </td>

                                                        <td>
                                                            TXN-
                                                            {
                                                                repayment.transactionReference
                                                                    ?.substring(
                                                                        0,
                                                                        8
                                                                    )
                                                            }
                                                        </td>

                                                    </tr>

                                                )
                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >
                                                    No Repayments Found
                                                </td>

                                            </tr>

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
                                                onClick={() => setPage(page - 1)}
                                            >
                                                Previous
                                            </button>

                                        </li>

                                        {

                                            [...Array(totalPages)]
                                                .map((_, index) => (
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
                                                                    count = count + 1
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

export default ExecutiveLoanMonitoring;