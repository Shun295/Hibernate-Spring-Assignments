import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

    const location = useLocation();

    const menuStyle = (path) => ({
        display: "block",
        padding: "16px 24px",
        marginBottom: "22px",
        marginLeft: "12px",
        marginRight: "12px",
        borderRadius: "18px",
        textDecoration: "none",
        color: "white",
        fontSize: "18px",
        fontWeight: "500",
        background:
            location.pathname === path
                ? "rgba(255,255,255,0.08)"
                : "transparent"
    });

    return (

        <div
            style={{
                width: "280px",
                minHeight: "100vh",
                backgroundColor: "#04113a",
                color: "white"
            }}
        >

            <div
                style={{
                    paddingTop: "40px"
                }}
            >

                <Link
                    to="/admin"
                    style={menuStyle("/admin")}
                >
                    Dashboard
                </Link>

                <Link
                    to="/admin/branches"
                    style={menuStyle("/admin/branches")}
                >
                    Branches
                </Link>

                <Link
                    to="/admin/executives"
                    style={menuStyle("/admin/executives")}
                >
                    Executives
                </Link>

                <Link
                    to="/admin/customers"
                    style={menuStyle("/admin/customers")}
                >
                    Customers
                </Link>

                <Link
                    to="/admin/accounts"
                    style={menuStyle("/admin/accounts")}
                >
                    Accounts
                </Link>

                <Link
                    to="/admin/transaction-monitoring"
                    style={menuStyle("/admin/transaction-monitoring")}
                >
                    Transactions
                </Link>

                <Link
                    to="/admin/loans"
                    style={menuStyle("/admin/loans")}
                >
                    Loans
                </Link>

            </div>

        </div>

    );

};

export default Sidebar;