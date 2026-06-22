import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminReviewAccountOpeningRequest = () => {

    const { requestId } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [remarks, setRemarks] = useState("");

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [message, setMessage] = useState("");
    const [redirectPath, setRedirectPath] = useState("");
    const getRequestApi = `http://localhost:8080/api/accountOpeningReq/${requestId}/admin`;

    const approveApi = `http://localhost:8080/api/accountOpeningReq/${requestId}/approve`;

    const rejectApi = `http://localhost:8080/api/accountOpeningReq/${requestId}/reject`;

    //run this when the component first loads and whenever request is changes
    useEffect(() => {
        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
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
                console.error(err)
            }
        };
        getRequest();
    }, [requestId]);

    const approveRequest = async () => {

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };
        //empty {} acts as a placeholder for the body 
        try {
            await axios.put(approveApi, {}, config_details);
            setMessage(
                "Account Opening Request Approved"
            );

            setRedirectPath(
                "/admin/account-opening-requests"
            );

            setShowSuccessModal(true);
        }
        catch (err) {
            console.error(err)
            setMessage(
                "Approval Failed"
            );

            setShowErrorModal(true);
        }
    };

    const rejectRequest = async () => {
        if (!remarks.trim()) {
            setMessage(
                "Please enter rejection remarks"
            );

            setShowErrorModal(true);

            return;
        }

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        try {
            await axios.put(rejectApi, { remarks }, config_details);

            setMessage(
                "Request Rejected Successfully"
            );

            setRedirectPath(
                "/admin/account-opening-requests"
            );

            setShowSuccessModal(true);
        }
        catch (err) {
            setMessage(
                "Reject Failed"
            );

            setShowErrorModal(true);
        }
    };

    //initially req=null but jsx might contsins req.reqId react tries to read
    //null.reqId (cant read properties of null)
    //with check shows loading so does not execute and no error occurs
    if (!request) {
        return <h3>Loading...</h3>;
    }

    return (

        <div className="container mt-4">

            <h2>
                Review Account Opening Request
            </h2>

            <div className="card mt-3">
                <div className="card-body">
                    <p>
                        <strong>Request ID:</strong>
                        {request.requestId}
                    </p>

                    <p>
                        <strong>Customer:</strong>
                        {request.customerName}
                    </p>

                    <p>
                        <strong>Account Type:</strong>
                        {request.accountType}
                    </p>
                    <p>
                        <strong>Branch Name:</strong>
                        {request.branchName}
                    </p>


                    <p>
                        <strong>Status:</strong>
                        {request.status}
                    </p>

                    <p>
                        <strong>Assigned Branch:</strong>
                        {request.branchName}
                    </p>

                    <p>
                        <strong>Reviewed By:</strong>
                        {request.reviewedBy}
                    </p>

                    <p>
                        <strong>Executive Remarks:</strong>
                    </p>

                    <div className="alert alert-info">
                        {request.remarks}
                    </div>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-header">

                    <h4>
                        Admin Decision
                    </h4>

                </div>

                <div className="card-body">

                    <div className="mb-3">

                        <label className="form-label">
                            Rejection Remarks
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
                        className="btn btn-success me-2"
                        onClick={approveRequest}
                    >
                        Approve
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={rejectRequest}
                    >
                        Reject
                    </button>

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

                                <div className="modal-header bg-success text-white">

                                    <h5 className="modal-title">
                                        Success
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>{message}</p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-success"
                                        onClick={() => {

                                            setShowSuccessModal(false);

                                            navigate(
                                                redirectPath
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
            {
                showErrorModal && (

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

                                <div className="modal-header bg-danger text-white">

                                    <h5 className="modal-title">
                                        Error
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>{message}</p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            setShowErrorModal(false)
                                        }
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

export default AdminReviewAccountOpeningRequest;