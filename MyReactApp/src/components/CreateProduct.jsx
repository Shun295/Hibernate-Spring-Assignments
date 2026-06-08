import { useState } from "react";

const CreateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [sCount, setSCount] = useState("");

    const [errmsgName, seterrmsgName] = useState("Name is Mandatory");
    const [errmsgPrice, seterrmsgPrice] = useState("Price is Mandatory");
    const [errmsgCategory, seterrmsgCategory] = useState("Category is Mandatory");
    const [errmsgsCount, seterrmsgsCount] = useState("Stock count is Mandatory");

    const addProduct = (e) => {
        e.preventDefault();

        console.log("Name:", name);
        console.log("Price:", price);
        console.log("Category:", category);
        console.log("Stock Count:", sCount);

        alert("Product Added Successfully");
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-3"></div>

                <div className="col-md-6">

                    <form onSubmit={addProduct}>

                        <div className="card">

                            <div className="card-header">
                                Enter Product Details
                            </div>

                            <div className="card-body">

                                {/* Product Name */}
                                <div className="mb-4">
                                    <label>Product Name: </label>{" "}
                                    <span className="badge text-bg-danger">
                                        {errmsgName}
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => {

                                            const value = e.target.value;

                                            if (value === "") {
                                                seterrmsgName("Name is Mandatory");
                                            }
                                            else if (value.length < 3) {
                                                seterrmsgName("Minimum 3 characters required");
                                            }
                                            else {
                                                seterrmsgName("");
                                            }

                                            setName(value);
                                        }}
                                    />
                                </div>

                                {/* Product Price */}
                                <div className="mb-4">
                                    <label>Product Price: </label>{" "}
                                    <span className="badge text-bg-danger">
                                        {errmsgPrice}
                                    </span>

                                    <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) => {

                                            const value = e.target.value;

                                            if (value === "") {
                                                seterrmsgPrice("Price is Mandatory");
                                            }
                                            else if (Number(value) <= 0) {
                                                seterrmsgPrice("Price must be greater than 0");
                                            }
                                            else {
                                                seterrmsgPrice("");
                                            }

                                            setPrice(value);
                                        }}
                                    />
                                </div>

                                {/* Category */}
                                <div className="mb-4">
                                    <label>Category Name: </label>{" "}
                                    <span className="badge text-bg-danger">
                                        {errmsgCategory}
                                    </span>

                                    <select
                                        className="form-control"
                                        onChange={(e) => {

                                            const value = e.target.value;

                                            if (value === "") {
                                                seterrmsgCategory("Please Select Category");
                                            }
                                            else {
                                                seterrmsgCategory("");
                                            }

                                            setCategory(value);
                                        }}
                                    >
                                        <option value="">---Select Category---</option>
                                        <option value="mobile">Mobiles</option>
                                        <option value="laptop">Laptop</option>
                                        <option value="desktop">Desktop</option>
                                    </select>
                                </div>

                                {/* Stock Count */}
                                <div className="mb-4">
                                    <label>Stock Count: </label>{" "}
                                    <span className="badge text-bg-danger">
                                        {errmsgsCount}
                                    </span>

                                    <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) => {

                                            const value = e.target.value;

                                            if (value === "") {
                                                seterrmsgsCount("Stock Count is Mandatory");
                                            }
                                            else if (Number(value) < 0) {
                                                seterrmsgsCount("Stock cannot be negative");
                                            }
                                            else {
                                                seterrmsgsCount("");
                                            }

                                            setSCount(value);
                                        }}
                                    />
                                </div>

                            </div>

                            <div className="card-footer">

                                <input
                                    type="submit"
                                    value="Add Product"
                                    className="btn btn-secondary"
                                    disabled={
                                        !name ||
                                        !price ||
                                        !category ||
                                        !sCount ||
                                        errmsgName !== "" ||
                                        errmsgPrice !== "" ||
                                        errmsgCategory !== "" ||
                                        errmsgsCount !== ""
                                    }
                                />

                            </div>

                        </div>

                    </form>

                </div>

                <div className="col-sm-3"></div>
            </div>
        </div>
    );
};

export default CreateProduct;