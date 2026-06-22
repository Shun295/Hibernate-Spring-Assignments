import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExecutiveProfile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] =
        useState(null);

    const api =
        "http://localhost:8080/api/executive/my-profile";

    useEffect(() => {

        const getProfile =
            async () => {

                try {

                    const config_details = {

                        headers: {

                            Authorization:
                                "Bearer " +
                                localStorage.getItem("token")

                        }

                    };

                    const response =
                        await axios.get(
                            api,
                            config_details
                        );

                    setProfile(
                        response.data
                    );

                }
                catch (err) {

                    console.log(
                        err?.response
                    );

                }

            };

        getProfile();

    }, []);

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>My Profile</h1>

                    {profile && (

                        <div
                            className="card mt-4 shadow-sm"
                            style={{
                                maxWidth: "700px"
                            }}
                        >

                            <div className="card-body">

                                <div className="text-center">

                                    <div
                                        className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            fontSize: "40px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {
                                            profile.username
                                                ?.charAt(0)
                                                ?.toUpperCase()
                                        }
                                    </div>

                                   <h3 className="mt-3">
    {profile.firstName} {profile.lastName}
</h3>

                                    
<p className="text-muted">
    {profile.role}
</p>

                                </div>

                                <hr />

                                <div className="row">

    <div className="col-md-6">

        <p>
            <strong>Employee ID :</strong>{" "}
            {profile.employeeId}
        </p>

        <p>
            <strong>Username :</strong>{" "}
            {profile.username}
        </p>

        <p>
            <strong>Email :</strong>{" "}
            {profile.email}
        </p>

        <p>
            <strong>Phone :</strong>{" "}
            {profile.phoneNumber}
        </p>

        <p>
            <strong>Gender :</strong>{" "}
            {profile.gender}
        </p>

    </div>

    <div className="col-md-6">

        <p>
            <strong>Date of Birth :</strong>{" "}
            {profile.dateOfBirth}
        </p>

        <p>
            <strong>Branch :</strong>{" "}
            {profile.branchName}
        </p>

        <p>
            <strong>Designation :</strong>{" "}
            {profile.designation}
        </p>

        <p>
            <strong>Address :</strong>{" "}
            {profile.address}
        </p>

    </div>

</div>

                                <hr />

                                <div className="text-center">

                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            navigate(
                                                "/change-password"
                                            )
                                        }
                                    >
                                        Change Password
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};

export default ExecutiveProfile;