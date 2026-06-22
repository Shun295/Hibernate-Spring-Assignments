import axios from "axios";

const getAllBranchesApi =
    "http://localhost:8080/api/branch/all";

export const getAllBranches = () => {

    return async (dispatch) => {
        const config = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem( "token")
            }

        };
        const response =
            await axios.get(
                getAllBranchesApi,
                config
            );


console.log("API RESPONSE", response.data);

        dispatch({
            type: "GET_ALL_BRANCHES",
            //data comed from backend
            payload: response.data.data
        });
    };
};