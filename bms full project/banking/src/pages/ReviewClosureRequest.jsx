import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewClosureRequest = () => {

    const navigate = useNavigate();
    const [remarks, setRemarks] = useState("");
    const { closureId } = useParams();
    const getRequestApi = `http://localhost:8080/api/accountClosure/${closureId}`;
    const reviewApi = `http://localhost:8080/api/accountClosure/admin/${closureId}/decision`;
    const [request, setRequest] = useState(null);

     useEffect(() => {
    const getRequestDetails = async () => {

        const config_details = {
            headers: {
                Authorization:"Bearer " + localStorage.getItem("token")
            }
        };
        try {
            const response = await axios.get(getRequestApi, config_details);
            console.log(response.data);
            setRequest(response.data);
        }
        catch (err) {
             console.error(err);
        }
    };

    const reviewRequest = async (status) => {
        const body = { remarks, status };

        const config_details = {
            headers: {
                Authorization:"Bearer " + localStorage.getItem("token")
            }
        };

        try {

            await axios.put(reviewApi,body,config_details);
            alert(`Request ${status} Successfully`);
            navigate("/admin/closureRequests");
        }
        catch (err) {
             console.error(err);
            alert("Review Failed");
        }
    };
   
        getRequestDetails();
    }, []);
    if (!request) {
        return <h3>Loading...</h3>;
    }

    return (

        <div className="container mt-4">

            <h2>Review Closure Request</h2>

            <div className="card mt-3">

                <div className="card-body">

                    <p>
                        <strong>Request Id:</strong>
                        {" "}
                        {request.id}
                    </p>

                    <p>
                        <strong>Customer Name:</strong>
                        {" "}
                        {request.customerName}
                    </p>

                    <p>
                        <strong>Customer Id:</strong>
                        {" "}
                        {request.customerId}
                    </p>

                    <p>
                        <strong>Account Id:</strong>
                        {" "}
                        {request.accountId}
                    </p>

                    <p>
                        <strong>Reason:</strong>
                        {" "}
                        {request.reason}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        {" "}
                        {request.status}
                    </p>

                    <p>
                        <strong>Executive Remarks:</strong>
                        {" "}
                        {request.remarks}
                    </p>

                </div>

            </div>
            <div className="card mt-3">

                <div className="card mt-4">

                    <div className="card-header">
                        <h4>Admin Decision</h4>
                    </div>

                    <div className="card-body">

                        <div className="mb-3">

                            <label>
                                Admin Remarks
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={remarks}
                                onChange={(e) =>
                                    setRemarks(e.target.value)
                                }
                            >
                            </textarea>

                        </div>

                        <button
                            className="btn btn-success me-2"
                            onClick={() =>
                                reviewRequest("APPROVED")
                            }
                        >
                            Approve
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                reviewRequest("REJECTED")
                            }
                        >
                            Reject
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ReviewClosureRequest;