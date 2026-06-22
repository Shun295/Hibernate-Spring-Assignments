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
                    to="/executive"
                    style={menuStyle("/executive")}
                >
                    Dashboard
                </Link>

                <Link
                    to="/executive/customers"
                    style={menuStyle("/executive/customers")}
                >
                    Customers
                </Link>

                <Link
                    to="/executive/accounts"
                    style={menuStyle("/executive/accounts")}
                >
                    Accounts
                </Link>

                <Link
                    to="/executive/branches"
                    style={menuStyle("/executive/branches")}
                >
                    Branches
                </Link>

                <Link
                    to="/executive/loans"
                    style={menuStyle("/executive/loans")}
                >
                    Loans
                </Link>

                <Link
                    to="/executive/transaction-monitoring"
                    style={menuStyle("/executive/transaction-monitoring")}
                >
                    Transactions
                </Link>

            </div>

        </div>

    );

};

export default Sidebar;