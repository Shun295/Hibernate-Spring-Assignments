import { products } from "../sample data/products"
function Products(){
    return(
        <div>
            <h1> List Of Products</h1>
            <table>
                <thead>
                <tr>
                     <th>Sr. No</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>In Stock</th>
                </tr>
                </thead>
                <tbody>
                    {
                        products.map((p,index)=>(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.brand}</td>
                                <td>{p.category}</td>
                                <td>{p.price}</td>
                                <td>{p.inStock? "true" : "false"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Products