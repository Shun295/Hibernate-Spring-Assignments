import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";
const ExecutiveReviewLoanApplication = () => {

    const { applicationId } = useParams();

    const navigate = useNavigate();

    const [application, setApplication] =
        useState(null);

    const [remarks, setRemarks] =
        useState("");
    const [eligibleAmount, setEligibleAmount] =
        useState("");

    const [status, setStatus] =
        useState("");
        
    const getApplicationApi =
        `http://localhost:8080/api/loan-application/${applicationId}`;

    const reviewApi =
        `http://localhost:8080/api/loan-application/${applicationId}/review`;

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        const getApplication = async () => {

            try {

                const response =
                    await axios.get(
                        getApplicationApi,
                        config_details
                    );

                setApplication(
                    response.data
                );
                setEligibleAmount(
    response.data.eligibleAmount
);

            }
            catch (err) {

                console.error(err)

            }

        };

        getApplication();

    }, []);

    const submitReview = async () => {


        const body = {
            remarks,
            eligibleAmount,

            status
        };

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        try {

            await axios.put(
                reviewApi,
                body,
                config_details
            );

            alert(
                "Loan Application Reviewed Successfully"
            );

            navigate(
                "/executive/loan-applications"
            );

        }
        catch (err) {

            console.error(err)

            alert(
                "Review Failed"
            );

        }

    };

    if (!application) {

        return <h3>Loading...</h3>;

    }

    return (

       <div>

        <NavbarExecutive />

        <div className="d-flex">

            <Sidebar />

            <div className="container-fluid p-4">

                <h2>
                    Review Loan Application
                </h2>

                <div className="card mt-3">

                    <div className="card-body">

                    <p>
                        <strong>
                            Application ID:
                        </strong>
                        {" "}
                        {application.applicationId}
                    </p>

                    <p>
                        <strong>
                            Customer:
                        </strong>
                        {" "}
                        {application.customerName}
                    </p>

                    <p>
                        <strong>
                            Loan Type:
                        </strong>
                        {" "}
                        {application.loanType}
                    </p>

                    <p>
                        <strong>
                            Principal Amount:
                        </strong>
                        {" "}
                        {application.principalAmount}
                    </p>

                    <p>
                        <strong>
                            Annual Salary:
                        </strong>
                        {" "}
                        {application.annualSalary}
                    </p>
                    <p>
    <strong>
        Recommended Eligible Amount:
    </strong>
    {" "}
    ₹{Number(
        application.eligibleAmount
    ).toLocaleString()}
</p>
                    <p>
                        <strong>
                            Interest Rate:
                        </strong>
                        {" "}
                        {application.interestRate}%
                    </p>

                    <p>
                        <strong>
                            Term:
                        </strong>
                        {" "}
                        {application.termInMonth}
                        {" "}
                        Months
                    </p>

                    <p>
                        <strong>
                            EMI Amount:
                        </strong>
                        {" "}
                        {application.emiAmount}
                    </p>

                    <p>
                        <strong>
                            Total Repayable:
                        </strong>
                        {" "}
                        {application.totalRepayableAmount}
                    </p>

                    <p>
                        <strong>
                            Status:
                        </strong>
                        {" "}
                        {application.status}
                    </p>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-header">

                    <h4>
                        Executive Review
                    </h4>

                </div>

                <div className="card-body">

                    <div className="mb-3">

                        <div className="mb-3">

                            <label className="form-label">
                                Final Eligible Amount
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                value={eligibleAmount}
                                onChange={(e) =>
                                    setEligibleAmount(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Review Decision
                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value
                                    )
                                }
                                required
                            >

                                <option value="">
                                    Select Decision
                                </option>

                                <option value="REVIEWED">
                                    Forward To Admin
                                </option>

                                <option value="CUSTOMER_ACTION_REQUIRED">
                                    Customer Modification Required
                                </option>

                            </select>

                        </div>

                        <label className="form-label">
                            Remarks
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            value={remarks}
                            onChange={(e) =>
                                setRemarks(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={submitReview}
                    >
                        Submit Review
                    </button>

                </div>

            </div>

        </div>
        </div>
        </div>

    );

};

export default ExecutiveReviewLoanApplication;