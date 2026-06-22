import { useEffect, useState } from "react";
import axios from "axios";
import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";
import { useNavigate } from "react-router-dom";

const AdminJointAccountApprovals = () => {

    const [requests, setRequests] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const [rejectRemark, setRejectRemark] = useState("");
    const [rejectRemarks, setRejectRemarks] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [modalMessage, setModalMessage] = useState("");

    const [modalType, setModalType] = useState("");
    let count = 0;
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem("token")
        }
    };

    useEffect(() => {
        loadRequests();
    }, [page]);

    const loadRequests = async () => {

        try {

            const response =
                await axios.get(

                    `http://localhost:8080/api/jointAccReq/reviewed?page=${page}&size=10`,

                    config
                );

            setRequests(response.data.data);

            setTotalPages(response.data.totalPages);

        }
        catch (err) {
            console.error(err)
        }

    };

    const approveSelectedRequest =
        async () => {

            try {

                await axios.put(
                    `http://localhost:8080/api/jointAccReq/${selectedRequest.id}/approve`,
                    {},
                    config
                );

                setModalMessage("Approved Successfully");
                setModalType("success");
                setShowModal(true);

                navigate(
                    "/admin/joint-account-approvals"
                );

            }
            catch (err) {
                console.log(err?.response);
                setModalMessage("Approved Successfully");
                setModalType("success");
                setShowModal(true);
            }

        };

    const rejectSelectedRequest =
        async () => {

            try {

                await axios.put(

                    `http://localhost:8080/api/jointAccReq/${selectedRequest.id}/reject`,

                    {
                        remarks:
                            rejectRemark
                    },

                    config

                );

                setModalMessage("Rejected Successfully");
                setModalType("success");
                setShowModal(true);
                navigate(
                    "/admin/joint-account-approvals"
                );

            }
            catch (err) {
                console.error(err)
                setModalMessage("Unable To Reject Request");
                setModalType("danger");
                setShowModal(true);
            }

        };
    return (
        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container mt-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Joint Account Approvals
                        </h1>

                        <p className="page-subtitle">
                            Review and approve joint account requests submitted by executives
                        </p>

                    </div>

                    <div className="card account-request-card">

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Requested By</th>
                                        <th>Joint Holder</th>
                                        <th>Account</th>
                                        <th>Executive Remarks</th>
                                        <th>Reviewed By</th>
                                        <th>Created</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        requests.map(
                                            (req) => (

                                                <tr key={req.id}>

                                                    <td>
                                                        <strong>
                                                            JAR-{req.id}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {req.requestedBy}
                                                    </td>

                                                    <td>
                                                        {req.jointHolder}
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {req.accountNumber}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {req.remarks}
                                                    </td>

                                                    <td>
                                                        {req.reviewedBy}
                                                    </td>

                                                    <td>
                                                        {
                                                            new Date(
                                                                req.createdAt
                                                            ).toLocaleDateString()
                                                        }
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-outline-primary btn-sm px-3"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#requestModal"
                                                            onClick={() =>
                                                                setSelectedRequest(req)
                                                            }
                                                        >
                                                            View
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )
                                    }

                                </tbody>

                            </table>
                            <div
                                className="modal fade"
                                id="requestModal"
                                tabIndex="-1"
                            >

                                <div className="modal-dialog modal-lg">

                                    <div className="modal-content">

                                        <div className="modal-header">

                                            <h5 className="modal-title">
                                                Joint Account Approval
                                            </h5>

                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                            />

                                        </div>

                                        <div className="modal-body">

                                            {
                                                selectedRequest &&
                                                <>

                                                    <div className="row">

                                                        <div className="col-md-6 mb-3">

                                                            <label>
                                                                Requested By
                                                            </label>

                                                            <input
                                                                className="form-control"
                                                                value={
                                                                    selectedRequest.requestedBy
                                                                }
                                                                readOnly
                                                            />

                                                        </div>

                                                        <div className="col-md-6 mb-3">

                                                            <label>
                                                                Joint Holder
                                                            </label>

                                                            <input
                                                                className="form-control"
                                                                value={
                                                                    selectedRequest.jointHolder
                                                                }
                                                                readOnly
                                                            />

                                                        </div>

                                                    </div>

                                                    <div className="mb-3">

                                                        <label>
                                                            Account Number
                                                        </label>

                                                        <input
                                                            className="form-control"
                                                            value={
                                                                selectedRequest.accountNumber
                                                            }
                                                            readOnly
                                                        />

                                                    </div>

                                                    <div className="mb-3">

                                                        <label>
                                                            Executive Remarks
                                                        </label>

                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            readOnly
                                                            value={
                                                                selectedRequest.remarks
                                                            }
                                                        />

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-md-6">

                                                            <label>
                                                                Reviewed By
                                                            </label>

                                                            <input
                                                                className="form-control"
                                                                value={
                                                                    selectedRequest.reviewedBy
                                                                }
                                                                readOnly
                                                            />

                                                        </div>

                                                        <div className="col-md-6">

                                                            <label>
                                                                Created Date
                                                            </label>

                                                            <input
                                                                className="form-control"
                                                                value={
                                                                    new Date(
                                                                        selectedRequest.createdAt
                                                                    ).toLocaleDateString()
                                                                }
                                                                readOnly
                                                            />

                                                        </div>

                                                    </div>

                                                    <hr />

                                                    <div className="mb-3">

                                                        <label>
                                                            Rejection Remarks
                                                        </label>

                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            value={
                                                                rejectRemark
                                                            }
                                                            onChange={(e) =>
                                                                setRejectRemark(
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                    </div>

                                                </>
                                            }

                                        </div>

                                        <div className="modal-footer">

                                            <button
                                                className="btn btn-success px-4"
                                                onClick={
                                                    approveSelectedRequest
                                                }

                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={
                                                    rejectSelectedRequest
                                                }
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <nav aria-label="Page navigation example" className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={page === 0}
                                            onClick={() => setPage(page - 1)}
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {
                                        Array.from({ length: totalPages }).map((_, index) => (

                                            <li
                                                key={index}
                                                className="page-item"
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() => setPage(index)}
                                                >
                                                    {count = count + 1}
                                                </button>

                                            </li>

                                        ))
                                    }

                                    <li className="page-item">

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
            {
                showModal && (

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

                                        {
                                            modalType === "success"
                                                ? "Success"
                                                : "Failed"
                                        }

                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        {modalMessage}
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className={`btn btn-${modalType}`}
                                        onClick={() => {

                                            setShowModal(false);

                                            if (
                                                modalType === "success"
                                            ) {

                                                navigate(
                                                    "/admin/joint-account-approvals"
                                                );

                                            }

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

export default AdminJointAccountApprovals;