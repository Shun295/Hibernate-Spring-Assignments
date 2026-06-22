import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {

    return (

        <div>

            <Navbar />

              <section className="hero-section">

    <div className="container">

        <div className="row align-items-center">

            <div className="col-lg-6">

                <h1 className="hero-title">
                    Smart Banking For
                    Modern Life
                </h1>

                <p className="hero-subtitle">

                    Open accounts, apply for loans,
                    manage finances and transfer money
                    securely with Maverick Bank.

                </p>

                <Link
                    to="/login"
                    className="btn btn-primary btn-lg mt-3"
                >
                    Get Started
                </Link>

            </div>

            <div className="col-lg-6">

               <div className="hero-card">

    <h2>Secure Banking</h2>

    <p>
        Digital Banking Management System
    </p>

    <hr />

    <h2>24/7</h2>

    <p>
        Account & Transaction Access
    </p>

</div>

            </div>

        </div>

    </div>

</section>
<div className="container py-5">

    <div className="row g-4">

        <div className="col-md-3">

            <div className="summary-card">

                <h2>50K+</h2>

                <p>Customers</p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="summary-card">

                <h2>100+</h2>

                <p>Branches</p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="summary-card">

                <h2>24/7</h2>

                <p>Support</p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="summary-card">

                <h2>₹500Cr+</h2>

                <p>Transactions</p>

            </div>

        </div>

    </div>

</div>
<section className="container py-5">

    <h2 className="section-title text-center mb-5">
        Banking Services
    </h2>

    <div className="row g-4">

        <div className="col-md-3">

            <div className="feature-card">

                <h1>🏦</h1>

                <h4>Accounts</h4>

                <p>
                    Savings, Current and Joint Accounts
                </p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="feature-card">

                <h1>💰</h1>

                <h4>Loans</h4>

                <p>
                    Home, Personal and Vehicle Loans
                </p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="feature-card">

                <h1>💳</h1>

                <h4>Transfers</h4>

                <p>
                    Fast and Secure Fund Transfers
                </p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="feature-card">

                <h1>📈</h1>

                <h4>Investments</h4>

                <p>
                    Grow your wealth securely
                </p>

            </div>

        </div>

    </div>

</section>
<section className="why-section">

    <div className="container">

        <h2 className="text-center mb-5">
            Why Maverick Bank?
        </h2>

        <div className="row text-center">

            <div className="col-md-4">

                <h1>🔒</h1>

                <h4>
                    Secure Banking
                </h4>

                <p>
                    Industry-grade security
                    for every transaction.
                </p>

            </div>

            <div className="col-md-4">

                <h1>⚡</h1>

                <h4>
                    Instant Processing
                </h4>

                <p>
                    Faster approvals and
                    real-time transactions.
                </p>

            </div>

            <div className="col-md-4">

                <h1>🤝</h1>

                <h4>
                    Trusted Service
                </h4>

                <p>
                    Thousands of customers
                    trust Maverick Bank.
                </p>

            </div>

        </div>

    </div>

</section>
<footer className="footer-section">

    <div className="container text-center">

        <h4>Maverick Bank</h4>

        <p>
            Secure • Reliable • Trusted
        </p>

        <small>
            © 2026 Maverick Bank. All Rights Reserved.
        </small>

    </div>

</footer>

        </div>

    );

};

export default Home;