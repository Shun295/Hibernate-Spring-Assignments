import { useEffect } from "react";

import {
    useDispatch,
    useSelector
}
from "react-redux";

import {
    getAllBranches
}
from "../store/action/branchAction";

const BranchList = () => {

    const dispatch =
        useDispatch();

    const { branches } =
        useSelector(
            state => state.branches
        );

    useEffect(() => {

        dispatch(
            getAllBranches()
        );

    }, []);

    return (

        <div>

            <h3>
                Branch List
            </h3>

            {
                branches.map(

                    (branch) => (

                        <div
                            key={branch.id}
                            className="card mt-2 p-3"
                        >

                            <p>
                                Branch ID :
                                {" "}
                                {branch.id}
                            </p>

                            <p>
                                Branch Name :
                                {" "}
                                {branch.branchName}
                            </p>

                            <p>
                                IFSC :
                                {" "}
                                {branch.ifscCode}
                            </p>

                            <p>
                                City :
                                {" "}
                                {branch.city}
                            </p>

                        </div>

                    )

                )
            }

        </div>

    );

};

export default BranchList;