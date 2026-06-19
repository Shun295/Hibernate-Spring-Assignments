import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CharacterList = ({ currentPage, setCurrentPage }) => {

    const { characters, totalPages } = useSelector(
        state => state.characters
    );

    const [arry, setArry] = useState([]);

    let count = 0;

    useEffect(() => {
        setArry(Array.from({length: totalPages
            })
        );
    }, [totalPages]);
    return (
        <div className="container mt-4">
            <h2 className="mb-4"> Character List</h2>
            <table className="table table-bordered table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Species</th>
                        <th>Origin</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        characters.map(
                            (c, index) => (

                                <tr key={index}>

                                    <td>
                                        {((currentPage - 1) * 20) + index + 1}
                                    </td>
                                    <td>
                                        {c.name}
                                    </td>

                                    <td>
                                        {c.status}
                                    </td>

                                    <td>
                                        {c.species}
                                    </td>

                                    <td>
                                        {c.origin.name}
                                    </td>

                                    <td>
                                        {c.location.name}
                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>
            <nav aria-label="Page navigation example">

                <ul className="pagination justify-content-center">

                    <li className="page-item">

                        <button
                            className="page-link"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                            }
                        >
                            Previous
                        </button>

                    </li>

                    {
                        arry?.map((_, index) => (

                            index + 1 >= currentPage - 2 &&
                            index + 1 <= currentPage + 2 &&

                            <li
                                className={
                                    currentPage === index + 1
                                        ? "page-item active"
                                        : "page-item"
                                }
                                key={index}
                            >

                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(index + 1)
                                    }
                                >
                                    {index + 1}
                                </button>

                            </li>

                        ))
                    }

                    <li className="page-item">

                        <button
                            className="page-link"
                            disabled={
                                currentPage === totalPages
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage + 1
                                )
                            }
                        >
                            Next
                        </button>

                    </li>

                </ul>

            </nav>

        </div>
    );
}

export default CharacterList;