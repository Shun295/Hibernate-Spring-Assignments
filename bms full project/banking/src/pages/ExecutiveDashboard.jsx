import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";
import Widget from "../components/executive/Widget";

const ExecutiveDashboard = () => {

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            <NavbarExecutive />

            <div className="d-flex flex-grow-1">

                <Sidebar />

                <div className="flex-grow-1 p-4">
                    <Widget />
                </div>

            </div>

        </div>
    );
};

export default ExecutiveDashboard;