import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

const ExecutiveDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [executive, setExecutive] =
        useState(null);

    useEffect(() => {

        fetchExecutive();

    }, []);

    const fetchExecutive = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/api/executive/get/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem("token")
                        }
                    }
                );

            setExecutive(response.data);

        }
        catch (err) {

            console.log(err?.response);

        }

    };

    return (
        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() =>
                            navigate("/admin/executives")
                        }
                    >
                        Back
                    </button>

                    <div className="card">

                        <div className="card-header">

                            <h3>
                                Executive Details
                            </h3>

                        </div>

                        <div className="card-body">

                            {executive && (

                                <div className="row">

                                    <div className="col-md-6">
                                        <p><strong>Employee ID:</strong> {executive.employeeId}</p>
                                        <p><strong>Username:</strong> {executive.username}</p>
                                        <p><strong>First Name:</strong> {executive.firstName}</p>
                                        <p><strong>Last Name:</strong> {executive.lastName}</p>
                                        <p><strong>Email:</strong> {executive.email}</p>
                                        <p><strong>Phone:</strong> {executive.phoneNumber}</p>
                                    </div>

                                    <div className="col-md-6">
                                        <p><strong>Gender:</strong> {executive.gender}</p>
                                        <p><strong>Date Of Birth:</strong> {executive.dateOfBirth}</p>
                                        <p><strong>Designation:</strong> {executive.designation}</p>
                                        <p><strong>Branch:</strong> {executive.branchName}</p>
                                        <p><strong>Address:</strong> {executive.address}</p>
                                    </div>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ExecutiveDetails;