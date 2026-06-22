
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams }
    from "react-router-dom";
import NavbarExecutive from "../components/Navbar-Executive";
import SidebarExecutive from "../components/executive/Sidebar";
const ExecutiveReviewAccountOpeningRequest = () => {

    const navigate = useNavigate();
    const { requestId } = useParams();
    const getRequestApi = `http://localhost:8080/api/accountOpeningReq/${requestId}`;
    const [request, setRequest] = useState([]);
    const [branches, setBranches] = useState([]);
    const [branchId, setBranchId] = useState("");
    const [remarks, setRemarks] = useState("");
    const getBranchesApi = "http://localhost:8080/api/branch/all";
    const reviewApi = `http://localhost:8080/api/accountOpeningReq/${requestId}/review`;
    useEffect(() => {

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        const getRequest = async () => {

            try {
                const response = await axios.get(getRequestApi, config_details);
                console.log(response.data);
                setRequest(response.data);
            }
            catch (err) {
                console.log(err?.response);
            }
        };
        const getBranches = async () => {
            try {
                const response = await axios.get(getBranchesApi, config_details);
                console.log(response.data);
                setBranches(response.data.data);

            }
            catch (err) {
                console.error(err);
            }
        };
        getRequest();
        getBranches();

    }, []);
    const submitReview = async () => {

    

        const body = { branchId, remarks };
        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        try {
            await axios.put(reviewApi, body, config_details);

            alert("Request Reviewed Successfully");
            navigate("/executive/account-opening-requests");
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
        <div>
            <NavbarExecutive />
            <div className="d-flex">
                <SidebarExecutive />
                <div className="container mt-4">

                    <h2>
                        Review Account Opening Request
                    </h2>

                    <div className="card mt-3">

                        <div className="card-body">

                            <p>
                                <strong>Request ID:</strong>
                                {request.id}
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
                                <strong>Status:</strong>
                                {request.status}
                            </p>
                            <p>

                                <strong>PAN Document:</strong>

{/*target=_blank=means current page stays and open in new page
security satting added with blank page*/ }
                                <a
                                    href={`http://localhost:8080/api/file/view/${request.panDocument}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ms-2"
                                >
                                    View PAN
                                </a>
                            </p>

                            <p>
                                <strong>Aadhaar Document:</strong>

                                <a
                                    href={`http://localhost:8080/api/file/view/${request.aadharDocument}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ms-2"
                                >
                                    View Aadhaar
                                </a>
                            </p>

                            <p>
                                <strong>Photo:</strong>

                                <a
                                    href={`http://localhost:8080/api/file/view/${request.photoDocument}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ms-2"
                                >
                                    View Photo
                                </a>
                            </p>
                            <div className="card mt-4">

                                <div className="card-header">
                                    <h4>Review Request</h4>
                                </div>

                                <div className="card-body">

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Assign Branch
                                        </label>

                                        <select
                                            className="form-select"
                                            value={branchId}
                                            required
                                            onChange={(e) =>
                                                setBranchId(e.target.value)
                                            }
                                        >

                                            <option value="">
                                                Select Branch
                                            </option>

                                            {
                                                branches

                                                    .map((branch) => (

                                                        <option
                                                            key={branch.id}
                                                            value={branch.id}
                                                        >
                                                            {branch.branchName}
                                                        </option>

                                                    ))
                                            }
                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Remarks
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            required
                                            value={remarks}
                                            onChange={(e) =>
                                                setRemarks(e.target.value)
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
            </div>
        </div>
    );
};

export default ExecutiveReviewAccountOpeningRequest;