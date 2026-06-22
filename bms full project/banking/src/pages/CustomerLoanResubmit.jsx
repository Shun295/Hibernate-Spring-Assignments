import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerLoanResubmit = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [principalAmount, setPrincipalAmount] = useState("");
    const [termInMonth, setTermInMonth] = useState("");

    const [eligibleAmount, setEligibleAmount] = useState("");
    const [remarks, setRemarks] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

   const detailsApi =
`http://localhost:8080/api/loan-application/customer/${id}`;

    const resubmitApi =
        `http://localhost:8080/api/loan-application/customer/resubmit/${id}`;

    useEffect(() => {

        const config = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        const loadApplication = async () => {

            try {

                const response =
                    await axios.get(
                        detailsApi,
                        config
                    );

                const data =
                    response.data;

                setPrincipalAmount(
                    data.principalAmount
                );

                setTermInMonth(
                    data.termInMonth
                );

                setEligibleAmount(
                    data.eligibleAmount
                );

                setRemarks(
                    data.remarks
                );

            }
            catch (err) {

                console.log(
                    err?.response
                );

            }

        };

        loadApplication();

    }, [id]);

    const resubmitLoan = async (e) => {

        e.preventDefault();

        const body = {

            principalAmount,

            termInMonth

        };

        const config = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        try {

            await axios.put(resubmitApi,body,config);
            setSuccessMsg(
                "Loan Application Resubmitted Successfully"
            );
            setErrorMsg("");
            setTimeout(() => {
                navigate("/customer/loans");
            }, 1500);

        }
        catch (err) {

            setErrorMsg(
                err.response?.data?.message
                ||
                "Failed to resubmit application"
            );

            setSuccessMsg("");

        }

    };

    return (

        <div>

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Resubmit Loan Application
                        </h1>

                        <p className="page-subtitle">
                            Modify your loan request based on executive review
                        </p>

                    </div>

                    <div className="card">

                        <div className="card-header">

                            <h4>
                                Loan Application Update
                            </h4>

                        </div>

                        <div className="card-body">

                            {
                                successMsg &&

                                <div className="alert alert-success">

                                    {successMsg}

                                </div>
                            }

                            {
                                errorMsg &&

                                <div className="alert alert-danger">

                                    {errorMsg}

                                </div>
                            }

                            <form
                                onSubmit={
                                    resubmitLoan
                                }
                            >

                                <div className="mb-3">

                                    <label className="form-label">

                                        Eligible Amount

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            eligibleAmount
                                        }
                                        readOnly
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Executive Remarks

                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={
                                            remarks
                                        }
                                        readOnly
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Principal Amount

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={
                                            principalAmount
                                        }
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

                                        Term In Months

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={
                                            termInMonth
                                        }
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
                                    className="btn btn-primary"
                                >
                                    Resubmit Application
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CustomerLoanResubmit;