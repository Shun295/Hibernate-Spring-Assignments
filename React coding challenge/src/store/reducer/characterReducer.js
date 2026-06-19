const initialState = {
    characters: [],
    totalPages: 0
}

export const characterReducer = (state = initialState,action) => {

    if (action.type === "GET_ALL") {
        return {
            ...state,
            characters:action.payload.characters,
            totalPages:action.payload.totalPages
        }
    }

    return state
}