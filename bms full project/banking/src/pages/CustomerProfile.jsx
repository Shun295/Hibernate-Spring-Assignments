import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate }
    from "react-router-dom";

const CustomerProfile = () => {


    const navigate = useNavigate();
    const [profile, setProfile] =
        useState(null);

    const api =
        "http://localhost:8080/api/customer/my-profile";

    useEffect(() => {

        const getProfile =
            async () => {

                try {

                    const config_details = {

                        headers: {

                            Authorization:
                                "Bearer " +
                                localStorage.getItem(
                                    "token"
                                )

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

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        My Profile
                    </h1>

                    {
                        profile && (

                            <div
                                className="card mt-4"
                                style={{
                                    maxWidth: "700px"
                                }}
                            >

                                <div className="card-body">

                                    <div
                                        className="text-center"
                                    >

                                        <div
                                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
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

                                        <h3
                                            className="mt-3"
                                        >

                                            {
                                                profile.fullName
                                            }

                                        </h3>

                                        <p
                                            className="text-muted"
                                        >
                                            CUSTOMER
                                        </p>

                                    </div>

                                    <hr />

                                    <div
                                        className="row"
                                    >

                                        <div
                                            className="col-md-6"
                                        >

                                            <p>

                                                <strong>
                                                    Customer ID :
                                                </strong>

                                                {" "}

                                                {
                                                    profile.customerId
                                                }

                                            </p>

                                            <p>

                                                <strong>
                                                    Username :
                                                </strong>

                                                {" "}

                                                {
                                                    profile.username
                                                }

                                            </p>

                                            <p>

                                                <strong>
                                                    Email :
                                                </strong>

                                                {" "}

                                                {
                                                    profile.email
                                                }

                                            </p>

                                        </div>

                                        <div
                                            className="col-md-6"
                                        >

                                            <p>

                                                <strong>
                                                    Phone :
                                                </strong>

                                                {" "}

                                                {
                                                    profile.phoneNumber
                                                }

                                            </p>

                                            <p>

                                                <strong>
                                                    Address :
                                                </strong>

                                                {" "}

                                                {
                                                    profile.address
                                                }

                                            </p>

                                        </div>

                                    </div>

                                    <hr />

                                    <div
                                        className="text-center"
                                    >



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

                        )
                    }

                </div>

            </div>

        </div>

    );

};

export default CustomerProfile;