import { useEffect, useState } from "react";
import { sampleProduct } from "../../assets/sampleData.js";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
	const [products, setProducts] = useState(sampleProduct);

    useEffect(   //setfunction ekk nis ekpr godk run weno ek wlwkw gnn useeffect fuction ekk deno eken  ek pr eki run wenne
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {     //axios ekn krnne db ekt gihin data tik load kr gnn ek
                console.log(res.data);
                setProducts(res.data)  //setproduct = setfuction
            });
        },[]  //useeffect dn kot[] mek aniwryenm dnn on
    )

	return (
		<div className="w-full h-full  max-h-full overflow-y-scroll bg-red-900 relative">
			<Link to="/admin/add-product" className="absolute text-5xl cursor-pointer bottom-5 right-4 bg-red-500 p-2 text-white py-2 px-4 rounded text-center flex fleex-center items-center">+</Link>   {/* add product.jsx ek link krl thiyenne*/}
            <table className="w-full text-center">
				<thead>
					<tr>
						<th>Product ID</th>
						<th>Name</th>
						<th>Image</th>
						<th>Labelled Price</th>
						<th>Price</th>
						<th>Stock</th>
					</tr>
				</thead>
				{  // mek {} dl linne html athule javascript liyn nis
                    <tbody>
					{products.map((item, index) => {  // map ekn krnne arrow ek athule thiyen ekkenk argen eyw run krno,item ekk kiyl methn kiynne.product e product thmi item widiyt mthnt pss wel enne,index kiyl kiynne run krnne kiweniyd kiyn ek
						return (
							<tr key={index}>   {/*methnt key ekk kiyl dnne genarete ekk wenkot newth newth ew awoth error ekk en nis*/}
								<td>{item.productId}</td>
								<td>{item.name}</td>
								<td>
                                    <img src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder-image.jpg'} className="w-[50px] h-[50px]" />
                                </td>
								<td>{item.labelledPrice}</td>
								<td>{item.price}</td>
								<td>{item.stock}</td>
							</tr>
						);
					})}
				</tbody> }
			</table>
        </div>
    )
}    

