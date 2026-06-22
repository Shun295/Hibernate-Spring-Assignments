import axios from "axios";

const getMyLoansApi =
    "http://localhost:8080/api/loan/my-loans";

export const getMyLoans = () => {

    return async (dispatch) => {

        try {

            const token =
                localStorage.getItem("token");

            console.log(
                "TOKEN:",
                token
            );

            const config_details = {
                headers: {
                    Authorization:
                        "Bearer " + token
                }
            };

            const response =
                await axios.get(
                    getMyLoansApi,
                    config_details
                );

            console.log(
                "Loan Response:",
                response.data
            );

            dispatch({

                type: "GET_MY_LOANS",

                payload:
                    response.data.data

            });

        }
        catch (err) {

            console.log(
                "Loan API Error:"
            );

            console.log(
                err?.response
            );

            console.log(
                err
            );

        }

    };

};