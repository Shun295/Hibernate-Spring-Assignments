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
                    to="/customer"
                    style={menuStyle("/customer")}
                >
                    Dashboard
                </Link>

                <Link
                    to="/customer/accounts"
                    style={menuStyle("/customer/accounts")}
                >
                    Accounts
                </Link>

                <Link
                    to="/customer/branches"
                    style={menuStyle("/customer/branches")}
                >
                    Branches
                </Link>

                <Link
                    to="/customer/beneficiaries"
                    style={menuStyle("/customer/beneficiaries")}
                >
                    Beneficiaries
                </Link>

                <Link
                    to="/customer/transactions"
                    style={menuStyle("/customer/transactions")}
                >
                    Transactions
                </Link>

                <Link
                    to="/customer/loans"
                    style={menuStyle("/customer/loans")}
                >
                    Loans
                </Link>

                <Link
                    to="/customer/loan-repayment"
                    style={menuStyle("/customer/loan-repayment")}
                >
                    Loan Repayment
                </Link>

               

            </div>

        </div>
    );
};

export default Sidebar;