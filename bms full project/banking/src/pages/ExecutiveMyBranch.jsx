import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useEffect, useState } from "react";
import axios from "axios";

const ExecutiveMyBranch = () => {

    const [branch, setBranch] =
        useState(null);

    useEffect(() => {

        const getMyBranch =
            async () => {

            try {

                const config = {

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

                        "http://localhost:8080/api/branch/my-branch",

                        config

                    );

                setBranch(
                    response.data
                );

            }
            catch(err){

                console.log(
                    err?.response
                );

            }

        };

        getMyBranch();

    }, []);

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        My Branch
                    </h1>

                    <div className="card mt-4">

                        <div className="card-body">

                            <h3>
                                {branch?.branchName}
                            </h3>

                            <hr />

                            <p>
                                <strong>
                                    Branch ID :
                                </strong>
                                {" "}
                                {branch?.id}
                            </p>

                            <p>
                                <strong>
                                    IFSC Code :
                                </strong>
                                {" "}
                                {branch?.ifscCode}
                            </p>

                            <p>
                                <strong>
                                    Address :
                                </strong>
                                {" "}
                                {branch?.address}
                            </p>

                            <p>
                                <strong>
                                    Email :
                                </strong>
                                {" "}
                                {branch?.email}
                            </p>

                            <p>
                                <strong>
                                    Phone :
                                </strong>
                                {" "}
                                {branch?.phoneNumber}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ExecutiveMyBranch;