import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ExecutiveReviewClosureRequest = () => {

    const { requestId } = useParams();
    const navigate = useNavigate();

    const [remarks, setRemarks] = useState("");
    const [request, setRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getRequestApi =
        `http://localhost:8080/api/accountClosure/${requestId}`;

    const reviewApi =
        `http://localhost:8080/api/accountClosure/${requestId}/review`;

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        const getRequest = async () => {

            try {

                const response = await axios.get(
                    getRequestApi,
                    config_details
                );

                setRequest(response.data);

            }
            catch (err) {

                console.log(err?.response);

            }

        };

        getRequest();

    }, []);

    const submitReview = async () => {

        const body = {
            remarks
        };

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            await axios.put(
                reviewApi,
                body,
                config_details
            );

            setShowModal(false);

            alert("Request Reviewed Successfully");

            navigate("/executive/closure-requests");

        }
        catch (err) {

            console.log(err?.response);

            alert("Review Failed");

        }

    };

    if (!request) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container mt-4">

            <h2>Review Closure Request</h2>

            <div className="card mt-3">

                <div className="card-body">

                    <p>
                        <strong>Request ID:</strong> {request.id}
                    </p>

                    <p>
                        <strong>Customer:</strong> {request.customerName}
                    </p>

                    <p>
                        <strong>Account Type:</strong> {request.accountType}
                    </p>

                    <p>
                        <strong>Reason:</strong> {request.reason}
                    </p>

                    <p>
                        <strong>Status:</strong> {request.status}
                    </p>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-header">
                    <h4>Review Request</h4>
                </div>

                <div className="card-body">

                    <div className="mb-3">

                        <label className="form-label">
                            Remarks
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            value={remarks}
                            onChange={(e) =>
                                setRemarks(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        Submit Review
                    </button>

                </div>

            </div>

            {
                showModal && (

                    <div
                        className="modal d-block"
                        tabIndex="-1"
                        style={{
                            backgroundColor: "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5 className="modal-title">
                                        Review Closure Request
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Are you sure you want to submit this review?
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    >
                                        No
                                    </button>

                                    <button
                                        className="btn btn-primary"
                                        onClick={submitReview}
                                    >
                                        Yes, Submit Review
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

export default ExecutiveReviewClosureRequest;