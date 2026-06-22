import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/customer-dashboard.css";
import CustomerSpendingChart from "../../pages/CustomerSpendingChart";
import { useSelector } from "react-redux";

const Widget = () => {

    const navigate = useNavigate();
    //label and amount comes from backedn dto
    const [spending,setSpending] = useState({
            label: [],
            amount: []
        });

        //customerdashboardDto
    const [dashboard, setDashboard] = useState({
        totalBalance: 0,
        activeAccounts: 0,
        activeLoans: 0,
        pendingRequests: 0,
        totalTransactions: 0,
        beneficiaries: 0
    });

    //runs once when page loads
    useEffect(() => {
        const fetchDashboard = async () => {

            try {

                const config = {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token")
                    }
                };

                const spendingResponse =
                    await axios.get( "http://localhost:8080/api/customer/monthly-spending", config);

                setSpending(spendingResponse.data );

                const response = await axios.get("http://localhost:8080/api/customer/dashboard", config
                );

                setDashboard(response.data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchDashboard();

    }, []);

    return (

        <div>

            <div className="page-header mb-4">

                <h1 className="page-title">
                    Customer Dashboard
                </h1>

                <p className="page-subtitle">
                    Manage your accounts, loans and banking activities
                </p>

            </div>

            {
                //mean if loanremainder is true
                dashboard.loanReminder &&
                <div
                    className="alert alert-warning mb-4"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        navigate("/customer/loan-repayment")
                    }
                >
                    ⚠️ Loan Reminder:
                    Your loan repayment is overdue.
                    Click here to make the payment.
                </div>
            }

            <div className="row g-4 mb-4">

                <div className="col-md-3">

                    <div className="dashboard-card-blue">
                        <h5>TOTAL BALANCE</h5>
                        <h2>
                            ₹{dashboard.totalBalance}
                        </h2>
                        <p>Available Balance</p>
                    </div>

                </div>

                <div className="col-md-3">
                    <div className="dashboard-card-green">
                        <h5>ACTIVE ACCOUNTS</h5>
                        <h2>
                            {dashboard.activeAccounts}
                        </h2>
                        <p>Your Bank Accounts</p>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="dashboard-card-purple">
                        <h5>ACTIVE LOANS</h5>
                        <h2>
                            {dashboard.activeLoans}
                        </h2>
                        <p>Running Loans</p>
                    </div>

                </div>

                <div className="col-md-3">

                    <div className="dashboard-card-yellow">

                        <h5>PENDING REQUESTS</h5>

                        <h2>
                            {dashboard.pendingRequests}
                        </h2>

                        <p>Awaiting Approval</p>

                    </div>

                </div>

            </div>

            <div className="row g-4">

                <div className="col-md-3">

                    <div
                        className="dashboard-action-card"
                        onClick={() =>
                            navigate("/customer/account-opening/apply")
                        }
                    >
                        <div className="feature-icon">🏦</div>

                        <h5>Open Account</h5>

                        <p>
                            Create a new savings or current account
                        </p>
                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="dashboard-action-card"
                        onClick={() =>
                            navigate("/customer/joint-account-request")
                        }
                    >
                        <div className="feature-icon">👥</div>

                        <h5>Joint Account</h5>

                        <p>
                            Request a joint account holder
                        </p>
                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="dashboard-action-card"
                        onClick={() =>
                            navigate("/customer/loan/apply")
                        }
                    >
                        <div className="feature-icon">💰</div>

                        <h5>Apply Loan</h5>

                        <p>
                            Submit a new loan application
                        </p>
                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="dashboard-action-card"
                        onClick={() =>
                            navigate("/customer/transactions")
                        }
                    >
                        <div className="feature-icon">📊</div>

                        <h5>Transactions</h5>

                        <p>
                            View account transactions
                        </p>
                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="dashboard-action-card"
                        onClick={() =>
                            navigate("/customer/closure-requests")
                        }
                    >
                        <div className="feature-icon">🔒</div>

                        <h5>Closure Request</h5>

                        <p>
                            Request account closure
                        </p>
                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="dashboard-action-card"
                        onClick={() =>
                            navigate("/customer/beneficiaries")
                        }
                    >
                        <div className="feature-icon">🤝</div>

                        <h5>Beneficiaries</h5>

                        <p>
                            Manage transfer beneficiaries
                        </p>
                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="dashboard-action-card"
                        onClick={() =>
                            navigate("/customer/accounts")
                        }
                    >
                        <div className="feature-icon">📁</div>

                        <h5>My Accounts</h5>

                        <p>
                            View all account details
                        </p>
                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="dashboard-action-card"
                        onClick={() =>
                            navigate("/customer/loan-repayment")
                        }
                    >
                        <div className="feature-icon">💳</div>

                        <h5>Loan Repayment</h5>

                        <p>
                            Pay and track loan EMIs
                        </p>
                    </div>

                </div>

            </div>
            {/* Spending Analytics */}

            <div className="card account-request-card">

                <div className="card-header bg-white border-0">

                    <h3 className="form-title">
                        Spending Analytics
                    </h3>

                    <p className="form-subtitle">
                        Track your monthly spending patterns
                    </p>

                </div>

                <div className="card-body">

                    <CustomerSpendingChart
                        labels={spending.label}
                        amounts={spending.amount}
                    />

                </div>

            </div>

        </div>

    );
};

export default Widget;