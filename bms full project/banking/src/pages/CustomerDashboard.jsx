import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";
import Widget from "../components/customer/Widget";
import LoanList from "../components/customer/LoanList";

import { getMyLoans }
    from "../store/action/loanAction";
const CustomerDashboard = () => {
    const dispatch =
        useDispatch();

    useEffect(() => {
        dispatch( getMyLoans());

    }, []);

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            <NavbarCustomer />

            <div className="d-flex flex-grow-1">

                <Sidebar />

                <div className="flex-grow-1 p-4">
                    <Widget />

                </div>


            </div>

        </div>
    );
};

export default CustomerDashboard;