const initialState = {

    loans: []

};

export const loanReducer = (
    state = initialState,
    action
) => {

    if (
        action.type ===
        "GET_MY_LOANS"
    ) {

        return {

            ...state,

            loans:
                action.payload

        };

    }

    return state;

};