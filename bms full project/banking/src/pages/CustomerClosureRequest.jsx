import { useState, useEffect } from "react";
import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CustomerClosureRequest = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const myRequestApi =
        "http://localhost:8080/api/accountClosure/my-request";

    const cancelApi =
        "http://localhost:8080/api/accountClosure";
    useEffect(() => {
        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        const getMyRequests = async () => {

            try {

                const response = await axios.get(myRequestApi, config_details
                );

                console.log(response.data);
                setRequests(response.data);
            }
            catch (err) {

                console.error(err)

            }
        };

        getMyRequests();

    }, []);

    const cancelRequest = async () => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            await axios.put(
                `${cancelApi}/${selectedRequestId}/cancel`,
                {},
                config_details
            );

            setRequests(
                requests.map((request) =>
                    request.id === selectedRequestId
                        ? {
                            ...request,
                            reqStatus: "CANCELLED"
                        }
                        : request
                )
            );

            setShowCancelModal(false);

            alert("Request Cancelled Successfully");

        }
        catch (err) {

            console.log(err?.response);

            alert("Unable to cancel request");
        }
    };

    return (
        <div>

            <NavbarCustomer />
            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <h1 className="page-title">
                                Closure Requests
                            </h1>

                            <p className="page-subtitle">
                                Track and manage your account closure requests
                            </p>
                        </div>

                        <button
                            className="btn btn-primary px-4 py-2"
                            onClick={() =>
                                navigate("/customer/closure-request/add")
                            }
                        >
                            Request Closure
                        </button>
                    </div>

                    <div className="row g-4 mb-4">

                        <div className="col-md-4">
                            <div className="summary-card">
                                <h5>TOTAL REQUESTS</h5>
                                <h2>{requests.length}</h2>
                                <p>All Closure Requests</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="summary-card">
                                <h5>PENDING</h5>
                                <h2>
                                    {
                                        requests.filter(
                                            r => r.reqStatus === "PENDING"
                                        ).length
                                    }
                                </h2>
                                <p>Awaiting Review</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="summary-card">
                                <h5>APPROVED</h5>
                                <h2>
                                    {
                                        requests.filter(
                                            r => r.reqStatus === "APPROVED"
                                        ).length
                                    }
                                </h2>
                                <p>Approved Requests</p>
                            </div>
                        </div>

                    </div>
                    <div className="table-card">

                        <div className="card-body">

                            <table className="table requests-table">

                                <thead>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>Account Number</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                        <th>Remarks</th>
                                        <th>Requested At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        requests.map((request) => (

                                            <tr key={request.id}>

                                                <td>{request.id}</td>

                                                <td>{request.accountNumber}</td>

                                                <td>{request.reason}</td>

                                                <td>

                                                    <span
                                                        className={
                                                            request.reqStatus === "APPROVED"
                                                                ? "status-badge active"
                                                                : request.reqStatus === "REJECTED"
                                                                    ? "status-badge rejected"
                                                                    : request.reqStatus === "CANCELLED"
                                                                        ? "status-badge closed"
                                                                        : "status-badge pending"
                                                        }
                                                    >
                                                        {request.reqStatus}
                                                    </span>

                                                </td>

                                                <td className="text-muted">
                                                    {request.remarks || "-"}
                                                </td>
                                                <td>
                                                    {
                                                        new Date(
                                                            request.createdAt
                                                        ).toLocaleDateString()
                                                    }
                                                </td>

                                                <td>

                                                    {
                                                        request.reqStatus === "PENDING" &&

                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() => {
                                                                setSelectedRequestId(request.id);
                                                                setShowCancelModal(true);
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    }

                                                </td>

                                            </tr>

                                        ))
                                    }

                                </tbody>

                            </table>

                        </div>
                    </div>

                </div>

            </div>
            {
                showCancelModal &&

                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}
                >

                    <div className="modal-dialog">

                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title text-danger">
                                    Cancel Request
                                </h5>

                                <button
                                    className="btn-close"
                                    onClick={() =>
                                        setShowCancelModal(false)
                                    }
                                >
                                </button>

                            </div>

                            <div className="modal-body">

                                <p>
                                    Are you sure you want to cancel this closure request?
                                </p>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowCancelModal(false)
                                    }
                                >
                                    No
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={cancelRequest}
                                >
                                    Yes, Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            }

        </div>
    );
};

export default CustomerClosureRequest;