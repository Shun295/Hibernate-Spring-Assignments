import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnboardExecutive = () => {


    const navigate = useNavigate();
    const postApi = "http://localhost:8080/api/auth/executive/add";

    const [employeeId, setEmployeeId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [branchId, setBranchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [designation, setDesignation] = useState("");
    const [username, setUsername] = useState("");

    const [errMsgEmployeeId, setErrMsgEmployeeId] = useState()
    const [errMsgFirstName, setErrMsgFirstName] = useState()
    const [errMsgLastName, setErrMsgLastName] = useState()
    const [errMsgEmail, setErrMsgEmail] = useState()
    const [errMsgPhoneNumber, setErrMsgPhoneNumber] = useState()
    const [errMsgGender, setErrMsgGender] = useState()
    const [errMsgDateOfBirth, setErrMsgDateOfBirth] = useState()
    const [errMsgAddress, setErrMsgAddress] = useState()
    const [errMsgBranchId, setErrMsgBranchId] = useState()
    const [errMsgDesignation, setErrMsgDesignation] = useState()
    const [errMsgUsername, setErrMsgUsername] = useState()

    const [successMsg, setSuccessMsg] = useState();
    const [errMsg, setErrMsg] = useState();

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/branch/all-list",
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            console.log(response.data);

            setBranches(response.data);

        } catch (err) {
            console.log(err);
        }
    };


    const onboardExecutive = async (e) => {
        e.preventDefault();



        let body = {
            'employeeId': employeeId,
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phoneNumber': phoneNumber,
            'gender': gender,
            'dateOfBirth': dateOfBirth,
            'address': address,
            'branchId': parseInt(branchId),
            'designation': designation,
            'username': username
        };

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            await axios.post(postApi, body, config_details);

            setSuccessMsg("Executive Added Successfully");
            ;

            setTimeout(() => {
                navigate("/admin/executives");
            }, 1500);
            setEmployeeId("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setGender("");
            setDateOfBirth("");
            setAddress("");
            setBranchId("");
            setDesignation("");
            setUsername("");
            setErrMsg(undefined);
            setErrMsgEmployeeId(undefined);
            setErrMsgFirstName(undefined);
            setErrMsgLastName(undefined);
            setErrMsgEmail(undefined);
            setErrMsgPhoneNumber(undefined);
            setErrMsgGender(undefined);
            setErrMsgDateOfBirth(undefined);
            setErrMsgAddress(undefined);
            setErrMsgBranchId(undefined);
            setErrMsgDesignation(undefined);
            setErrMsgUsername(undefined);

        } catch (err) {
            const field = err.response?.data

            setErrMsg("Executive Registration Failed ");
            setErrMsgEmployeeId(field?.employeeId)
            setErrMsgFirstName(field?.firstName)
            setErrMsgLastName(field?.lastName)
            setErrMsgEmail(field?.email)
            setErrMsgPhoneNumber(field?.phoneNumber)
            setErrMsgGender(field?.gender)
            setErrMsgDateOfBirth(field?.dateOfBirth)
            setErrMsgAddress(field?.address)
            setErrMsgBranchId(field?.branchId)
            setErrMsgDesignation(field?.designation)
            setErrMsgUsername(field?.username)

            setSuccessMsg(undefined)

        }
    };

    console.log("Branches:", branches);
console.log("First Branch:", branches?.[0]);

    return (

    <div className="row justify-content-center">

        <div className="col-xl-10">

            <div className="card account-request-card">

                <div className="card-header bg-white border-0">

                    <button
                        className="btn btn-outline-secondary mb-3"
                        onClick={() =>
                            navigate("/admin/executives")
                        }
                    >
                        ← Back
                    </button>

                    <h2 className="form-title">
                        Executive Registration Form
                    </h2>

                    <p className="form-subtitle">
                        Create a new executive profile and assign a branch
                    </p>

                </div>

                <div className="card-body">

                    {successMsg &&
                        <div className="alert alert-success">
                            {successMsg}
                        </div>
                    }

                    {errMsg &&
                        <div className="alert alert-danger">
                            {errMsg}
                        </div>
                    }

                    <form onSubmit={(e) => onboardExecutive(e)}>

                        {/* Employee Information */}

                        <h5 className="section-heading mb-3">
                            Employee Information
                        </h5>

                        <div className="row">

                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label>Employee ID</label>

                                    {errMsgEmployeeId &&
                                        <span className="text-danger ms-2">
                                            {errMsgEmployeeId}
                                        </span>
                                    }

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={employeeId}
                                        onChange={(e) =>
                                            setEmployeeId(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label>Username</label>

                                    {errMsgUsername &&
                                        <span className="text-danger ms-2">
                                            {errMsgUsername}
                                        </span>
                                    }

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                            </div>

                        </div>

                        {/* Personal Information */}

                        <h5 className="section-heading mt-4 mb-3">
                            Personal Information
                        </h5>

                        <div className="row">

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Contact Information */}

                        <h5 className="section-heading mt-4 mb-3">
                            Contact Information
                        </h5>

                        <div className="row">

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) =>
                                            setPhoneNumber(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Additional Details */}

                        <div className="row">

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label>Gender</label>

                                    <select
                                        className="form-control"
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Gender
                                        </option>
                                        <option value="MALE">
                                            Male
                                        </option>
                                        <option value="FEMALE">
                                            Female
                                        </option>
                                        <option value="OTHER">
                                            Other
                                        </option>
                                    </select>

                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label>Date Of Birth</label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dateOfBirth}
                                        onChange={(e) =>
                                            setDateOfBirth(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="mb-3">

                            <label>Address</label>

                            <textarea
                                rows="3"
                                className="form-control"
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                                required
                            />

                        </div>

                        {/* Employment Details */}

                        <h5 className="section-heading mt-4 mb-3">
                            Employment Details
                        </h5>

                        <div className="row">

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label>Branch</label>

                                    <select
                                        className="form-control"
                                        value={branchId}
                                        onChange={(e) =>
                                            setBranchId(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Branch
                                        </option>

                                        {branches
  .filter(branch => branch.status === "ACTIVE")
  .map(branch => (
    <option
      key={branch.id}
      value={branch.id}
    >
      {branch.branchName}
    </option>
))}

                                    </select>

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label>Designation</label>

                                    <select
                                        className="form-control"
                                        value={designation}
                                        onChange={(e) =>
                                            setDesignation(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Designation
                                        </option>

                                        <option value="ACCOUNT_OFFICER">
                                            ACCOUNT OFFICER
                                        </option>

                                        <option value="LOAN_OFFICER">
                                            LOAN OFFICER
                                        </option>

                                        <option value="CUSTOMER_SUPPORT">
                                            CUSTOMER SUPPORT
                                        </option>

                                        <option value="OPERATIONS_EXECUTIVE">
                                            OPERATIONS EXECUTIVE
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>

                        <div className="text-end mt-4">

                            <button
                                type="submit"
                                className="btn btn-primary px-5"
                            >
                                Add Executive
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

);
};

export default OnboardExecutive;