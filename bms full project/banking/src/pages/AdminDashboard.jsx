
import NavbarAdmin from "../components/Navbar-Admin"
import Sidebar from "../components/admin/Sidebar"
import Widget from "../components/admin/Widget"

const AdminDashboard = () => {

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            <NavbarAdmin />

            <div className="d-flex flex-grow-1">

                <Sidebar />

                <div className="flex-grow-1 p-4">
                    <Widget />
                </div>

            </div>

        </div>
    )
}

export default AdminDashboard