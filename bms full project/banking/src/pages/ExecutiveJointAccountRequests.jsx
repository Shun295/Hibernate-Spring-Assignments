import { useEffect, useState } from "react";
import axios from "axios";
import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

const ExecutiveJointAccountRequests = () => {

    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    let count = 0;
    const [remarks, setRemarks] = useState({});

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

                    `http://localhost:8080/api/jointAccReq/pending?page=${page}&size=10`,

                    config
                );

            setRequests(
                response.data.data
            );

            setTotalPages(
                response.data.totalPages
            );

        }
        catch (err) {
            console.log(err?.response);
        }
    };

    const reviewRequest = async (id) => {

        if (!remarks[id]) {
            alert("Enter Remarks");
            return;
        }

        try {

            await axios.put(

                `http://localhost:8080/api/jointAccReq/${id}/review`,

                {
                    remarks: remarks[id]
                },

                config
            );

            alert(
                "Request Reviewed"
            );

            loadRequests();

        }
        catch (err) {
            console.error(err)
        }

    };

    return (
        <div>
            <NavbarExecutive />
            <div className="d-flex">
                <Sidebar />
                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="mb-4">
                            Joint Account Requests
                        </h1>

                        <div className="card">

                            <div className="card-body">

                                <table className="table table-bordered">

                                    <thead>

                                        <tr>
                                            <th>ID</th>
                                            <th>Requested By</th>
                                            <th>Joint Holder</th>
                                            <th>Account</th>
                                            <th>Status</th>
                                            <th>Reason</th>
                                            <th>Created</th>
                                            <th>Remarks</th>
                                            <th>Action</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            requests.map(
                                                (req) => (

                                                    <tr key={req.id}>

                                                        <td>{req.id}</td>

                                                        <td>
                                                            {req.requestedBy}
                                                        </td>

                                                        <td>
                                                            {req.jointHolder}
                                                        </td>

                                                        <td>
                                                            {req.accountNumber}
                                                        </td>

                                                        <td>
                                                            {req.status}
                                                        </td>
                                                        <td>{req.reason}</td>

                                                        <td>
                                                            {
                                                                new Date(
                                                                    req.createdAt
                                                                ).toLocaleDateString()
                                                            }
                                                        </td>

                                                        <td>

                                                            <textarea
                                                                className="form-control"
                                                                rows="2"
                                                                onChange={(e) =>
                                                                    setRemarks({
                                                                        ...remarks,
                                                                        [req.id]:
                                                                            e.target.value
                                                                    })
                                                                }
                                                            />

                                                        </td>

                                                        <td>

                                                            <button
                                                                className="btn btn-success"
                                                                onClick={() =>
                                                                    reviewRequest(
                                                                        req.id
                                                                    )
                                                                }
                                                            >
                                                                Review
                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )
                                        }

                                    </tbody>

                                </table>

                                <nav>

                                    <ul className="pagination justify-content-center">

                                        <li
                                            className="page-item"
                                        >

                                            <button
                                                className="page-link"
                                                disabled={page === 0}
                                                onClick={() => setPage(page - 1)}
                                            >
                                                Previous
                                            </button>

                                        </li>

                                        {

                                            [...Array(totalPages)]

                                                .map(

                                                    (_, index) => (

                                                        <li
                                                            key={index}
                                                            className="page-item"
                                                        >

                                                            <button
                                                                className="page-link"
                                                                onClick={() =>
                                                                    searchAccounts(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    count = count + 1
                                                                }
                                                            </button>

                                                        </li>

                                                    )

                                                )

                                        }

                                        <li
                                            className="page-item"
                                        >

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
                    </div>
                    </div>

                    );

};

                    export default ExecutiveJointAccountRequests;