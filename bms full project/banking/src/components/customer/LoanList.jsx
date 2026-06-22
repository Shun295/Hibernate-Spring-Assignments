import { useSelector }
from "react-redux";

const LoanList = () => {

    const { loans } =
        useSelector(
            state => state.loans
        );

    return (

        <div>

            <h3>
                My Loans
            </h3>

            {
                loans.map((loan) => (

                    <div
                        key={loan.loanId}
                        className="card mt-2 p-3"
                    >

                        <p>
                            Loan ID :
                            {loan.loanId}
                        </p>

                        <p>
                            Status :
                            {loan.loanStatus}
                        </p>

                        <p>
                            Balance :
                            {loan.balanceAmount}
                        </p>

                    </div>

                ))
            }

        </div>

    );

};

export default LoanList;