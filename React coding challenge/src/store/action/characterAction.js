import axios from "axios";

export const getAll = (page = 1) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `https://rickandmortyapi.com/api/character/?page=${page}`
            );

            console.log(response);
             console.log(response.data);
            dispatch({
                type: "GET_ALL",
                payload: {
                    characters: response.data.results,
                    totalPages: response.data.info.pages
                }
            });

        }
        catch (err) {

            console.log(err);
        }
    }
}