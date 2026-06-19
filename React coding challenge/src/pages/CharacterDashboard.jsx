import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CharacterList from "../components/CharacterList";
import { getAll } from "../store/action/characterAction";

const CharacterDashboard = () => {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        dispatch(getAll(currentPage));

    }, [currentPage]);
    return (
        <div>
            <h1 className="text-center mt-3">
                Character Dashboard
            </h1>

            <CharacterList 
             currentPage={currentPage}
            setCurrentPage={setCurrentPage}/>

        </div>

    );
};

export default CharacterDashboard;