const initialState = {
    branches: []
};
const branchReducer = (
    state = initialState,
    action
) => {
    switch(action.type){
        case "GET_ALL_BRANCHES":
            return {
                ...state,
                branches:action.payload
            };

        default:
            return state;
    }
};

export default branchReducer;