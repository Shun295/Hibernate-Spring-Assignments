import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/customer-common.css";
const ApplyLoan = () => {

    const navigate = useNavigate();

    const myAccountsApi =
        "http://localhost:8080/api/account/my-accounts";

    const loanTypesApi =
        "http://localhost:8080/api/loan-type/all";

    const applyLoanApi =
        "http://localhost:8080/api/loan-application/apply";

    const [accounts, setAccounts] = useState([]);
    const [loanTypes, setLoanTypes] = useState([]);

    const [accountId, setAccountId] = useState("");
    const [loanTypeId, setLoanTypeId] = useState("");
    const [principalAmount, setPrincipalAmount] = useState("");
    const [termInMonth, setTermInMonth] = useState("");
    const [annualSalary, setAnnualSalary] = useState("");
    const [showSuccessModal,
        setShowSuccessModal] =
        useState(false);
    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        const getAccounts = async () => {

            try {

                const response = await axios.get(
                    myAccountsApi,
                    config_details
                );

                setAccounts(response.data.data);

            }
            catch (err) {

                console.error(err)

            }

        };

        const getLoanTypes = async () => {

            try {

                const response = await axios.get(
                    loanTypesApi,
                    config_details
                );

                setLoanTypes(response.data);

            }
            catch (err) {

                console.error(err)

            }

        };

        getAccounts();
        getLoanTypes();

    }, []);

    const applyLoan = async (e) => {

        e.preventDefault();

        const body = {

            accountId,

            loanTypeId,

            principalAmount,
            annualSalary,

            termInMonth

        };

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        try {

            await axios.post(
                applyLoanApi,
                body,
                config_details
            );

            setShowSuccessModal(
                true
            );

        }
        catch (err) {

            console.error(err)

            alert(
                err?.response?.data?.message ||
                "Application Failed"
            );

        }

    };
    const selectedLoanType =
        loanTypes.find(
            loan =>
                loan.id ==
                loanTypeId
        );

    return (

        <div>

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">
                        <h1 className="page-title">
                            Apply for a Loan
                        </h1>

                        <p className="page-subtitle">
                            Select a loan type and submit your loan application
                        </p>
                    </div>

                    <div className="card account-request-card mt-4">



                        <div className="card-body">

                            <form
                                onSubmit={applyLoan}
                            >

                                <div className="mb-3">

                                    <label className="form-label">
                                        Account
                                    </label>

                                    <select
                                        className="form-select"
                                        value={accountId}
                                        onChange={(e) =>
                                            setAccountId(
                                                e.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Account
                                        </option>

                                        {
                                            accounts.map(
                                                (account) => (

                                                    <option
                                                        key={account.id}
                                                        value={account.id}
                                                    >

                                                        {
                                                            account.accountNumber
                                                        }

                                                    </option>

                                                )
                                            )
                                        }

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Loan Type
                                    </label>

                                    <select
                                        className="form-select"
                                        value={loanTypeId}
                                        onChange={(e) =>
                                            setLoanTypeId(
                                                e.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Loan Type
                                        </option>

                                        {
                                            loanTypes.map(
                                                (loanType) => (

                                                    <option
                                                        key={loanType.id}
                                                        value={loanType.id}
                                                    >

                                                        {loanType.loanType}

                                                    </option>

                                                )
                                            )
                                        }

                                    </select>

                                    {
                                        loanTypeId && (

                                            <div className="loan-info-card mt-3">

                                                <div className="loan-info-grid">

                                                    <div>
                                                        <small>Interest Rate</small>
                                                        <h6>
                                                            {
                                                                loanTypes.find(
                                                                    loan => loan.id == loanTypeId
                                                                )?.interestRate
                                                            }%
                                                        </h6>
                                                    </div>

                                                    <div>
                                                        <small>Max Amount</small>
                                                        <h6>
                                                            ₹
                                                            {
                                                                loanTypes.find(
                                                                    loan => loan.id == loanTypeId
                                                                )?.maxLoanAmount
                                                            }
                                                        </h6>
                                                    </div>

                                                    <div>
                                                        <small>Max Term</small>
                                                        <h6>
                                                            {
                                                                loanTypes.find(
                                                                    loan => loan.id == loanTypeId
                                                                )?.maxTermMonths
                                                            } Months
                                                        </h6>
                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    }

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Principal Amount
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={principalAmount}
                                        onChange={(e) =>
                                            setPrincipalAmount(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>
                                <div className="mb-3">

                                    <label className="form-label">
                                        Annual Salary
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={annualSalary}
                                        onChange={(e) =>
                                            setAnnualSalary(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Term In Months
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={termInMonth}
                                        onChange={(e) =>
                                            setTermInMonth(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-3"
                                >
                                    Apply Loan
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
            {
                showSuccessModal && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            backgroundColor:
                                "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5 className="modal-title">
                                        Loan Application Submitted
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Your loan application has been submitted successfully.
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-success"
                                        onClick={() => {

                                            setShowSuccessModal(
                                                false
                                            );

                                            navigate(
                                                "/customer/loans"
                                            );

                                        }}
                                    >
                                        OK
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );

};

export default ApplyLoan;