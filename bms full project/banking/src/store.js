import { configureStore }
from "@reduxjs/toolkit";

import { loanReducer }
from "./store/reducer/loanReducer";

import branchReducer
from "./store/reducer/branchReducer";

export const store =
configureStore({

    reducer: {

        loans: loanReducer,

        branches: branchReducer

    }

});