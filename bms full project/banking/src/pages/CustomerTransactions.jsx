import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";

import { useState } from "react";

import DepositForm from "../components/customer/DepositForm";
import WithdrawalForm from "../components/customer/WithdrawalForm";
import TransferForm from "../components/customer/TransferForm";
import TransactionHistory from "../components/customer/TransactionHistory";
import "../styles/customer-common.css";
const CustomerTransactions = () => {

    const [activeTab, setActiveTab] =
        useState("deposit");

    return (

        <div>

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">
                        <h1 className="page-title">
                            Transaction Center
                        </h1>

                        <p className="page-subtitle">
                            Deposit, withdraw, transfer funds and view transaction history
                        </p>
                    </div>

                    <div className="transaction-nav-card mb-4">

                        <button
                            className={`btn ${activeTab === "deposit"
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                                } me-2`}
                            onClick={() => setActiveTab("deposit")}
                        >
                            Deposit
                        </button>

                        <button
                            className={`btn ${activeTab === "withdraw"
                                    ? "btn-warning"
                                    : "btn-outline-warning"
                                } me-2`}
                            onClick={() => setActiveTab("withdraw")}
                        >
                            Withdraw
                        </button>

                        <button
                            className={`btn ${activeTab === "transfer"
                                    ? "btn-success"
                                    : "btn-outline-success"
                                } me-2`}
                            onClick={() => setActiveTab("transfer")}
                        >
                            Transfer
                        </button>

                        <button
                            className={`btn ${activeTab === "history"
                                    ? "btn-info"
                                    : "btn-outline-info"
                                }`}
                            onClick={() => setActiveTab("history")}
                        >
                            History
                        </button>

                    </div>

                    <div className="transaction-content-card">

                        {activeTab === "deposit" && <DepositForm />}

                        {activeTab === "withdraw" && <WithdrawalForm />}

                        {activeTab === "transfer" && <TransferForm />}

                        {activeTab === "history" && <TransactionHistory />}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CustomerTransactions;