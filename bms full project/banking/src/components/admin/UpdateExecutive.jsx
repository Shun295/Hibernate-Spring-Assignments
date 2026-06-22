import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateExecutive = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const getExecutiveApi =
        `http://localhost:8080/api/executive/get/${id}`;

    const updateApi =
        `http://localhost:8080/api/executive/admin/executive/update/${id}`;

    const branchApi =
        "http://localhost:8080/api/branch/all";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [branchId, setBranchId] = useState("");
    const [designation, setDesignation] = useState("");

    const [branches, setBranches] = useState([]);

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        const loadExecutive = async () => {

            try {

                const response = await axios.get(
                    getExecutiveApi,
                    config_details
                );

                console.log(response.data);

                const data = response.data;

                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setGender(data.gender);
                setDateOfBirth(data.dateOfBirth);
                setAddress(data.address);
                setBranchId(data.branchId);
                setDesignation(data.designation);

            }
            catch (err) {
                console.log(err?.response);
            }
        };

        const loadBranches = async () => {

            try {

                const response = await axios.get(
                    branchApi,
                    config_details
                );

                setBranches(response.data.data);

            }
            catch (err) {
                console.log(err?.response);
            }
        };

        loadExecutive();
        loadBranches();

    }, []);

    const updateExecutive = async (e) => {

        e.preventDefault();

        const body = {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            address,
            branchId,
            designation
        };

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            await axios.put(
                updateApi,
                body,
                config_details
            );


            navigate("/admin/executives");

        }
        catch (err) {

            console.log(err?.response);
        }
    };

    return (
        <div className="container mt-4">

            <div className="card">

                <div className="card-header">
                    <h3>Update Executive</h3>
                </div>

                <div className="card-body">
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() => navigate("/admin/executives")}
                    >
                        ← Back
                    </button>

                    <form onSubmit={updateExecutive}>

                        <div className="mb-3">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Gender</label>
                            <select
                                className="form-control"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Date Of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Address</label>
                            <textarea
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Branch</label>

                            <select
                                className="form-control"
                                value={branchId}
                                onChange={(e) => setBranchId(e.target.value)}
                                required
                            >
                                <option value="">
                                    Select Branch
                                </option>

                                {
                                    branches.map((branch) => (
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
                            <label>Designation</label>

                            <select
                                className="form-control"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                            >
                                <option value="">
                                    Select Designation
                                </option>

                                <option value="ACCOUNT_OFFICER">
                                    ACCOUNT_OFFICER
                                </option>

                                <option value="LOAN_OFFICER">
                                    LOAN_OFFICER
                                </option>

                                <option value="CUSTOMER_SUPPORT">
                                    CUSTOMER_SUPPORT
                                </option>

                            </select>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-warning"
                        >
                            Update Executive
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default UpdateExecutive;