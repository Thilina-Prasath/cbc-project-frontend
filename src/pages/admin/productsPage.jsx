import { useEffect, useState } from "react";
import { sampleProduct } from "../../assets/sampleData.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";;
export default function AdminProductsPage() {
	const [products, setProducts] = useState(sampleProduct);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
				.then((res) => {
					setProducts(res.data);
					setIsLoading(false);
				})
				.catch(() => {
					toast.error("Failed to load products");
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	function deleteProduct(productId) {
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Please login first");
			return;
		}
		axios
			.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then(() => {
				toast.success("Product deleted successfully");
				setIsLoading(true);
			})
			.catch((e) => {
				toast.error(e.response?.data?.message || "Failed to delete product");
			});
	}

	return (
		<div className="relative w-full h-full max-h-full overflow-y-auto p-4 font-[var(--font-main)]">
			<Link
				to="/admin/add-product"
				className="fixed bottom-6 right-6 bg-[var(--color-accent)] hover:bg-[var(--color-secondary)] text-white font-bold py-3 px-5 rounded-full shadow-lg transition duration-300"
			>
				+ Add Product
			</Link>

			{isLoading ? (
				<div className="w-full h-full flex justify-center items-center">
					<div className="w-16 h-16 border-4 border-gray-300 border-t-[var(--color-accent)] rounded-full animate-spin"></div>
				</div>
			) : (
				<div className="overflow-x-auto">
					
					<table className="w-full text-center border border-gray-200 shadow-md rounded-lg overflow-hidden">
						<thead className="bg-[var(--color-accent)] text-white">
							<tr>
								<th className="py-3 px-2">Product ID</th>
								<th className="py-3 px-2">Name</th>
								<th className="py-3 px-2">Image</th>
								<th className="py-3 px-2">Labelled Price</th>
								<th className="py-3 px-2">Price</th>
								<th className="py-3 px-2">Stock</th>
								<th className="py-3 px-2">Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((item, index) => (
								<tr
									
									key={index}
									className={`${
										index % 2 === 0
											? "bg-[var(--color-primary)]"
											: "bg-gray-100"
									} hover:bg-gray-200 transition`}
								>
									<td className="py-2 px-2">{item.productId}</td>
									<td className="py-2 px-2">{item.name}</td>
									<td className="py-2 px-2">
										<img
											src={item.images[0]}
											alt={item.name}
											className="w-12 h-12 object-cover rounded"
										/>
									</td>
									<td className="py-2 px-2">{item.labelledPrice}</td>
									<td className="py-2 px-2">{item.price}</td>
									<td className="py-2 px-2">{item.stock}</td>
									<td className="py-2 px-2">
										<div className="flex justify-center space-x-3">
											<button
												onClick={() => deleteProduct(item.productId)}
												className="text-red-500 hover:text-red-700 transition"
											>
												<FaTrash size={18} />
											</button>
											<button
												onClick={() =>
													navigate("/admin/edit-product", {
														state: item,
													})
												}
												className="text-blue-500 hover:text-blue-700 transition"
											>
												<FaEdit size={18} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}



// import { useEffect, useState } from "react";
// import { sampleProduct } from "../../assets/sampleData.js";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import toast from "react-hot-toast";

// export default function AdminProductsPage() {
// 	const [products, setProducts] = useState(sampleProduct);
// 	const [isloading, setIsLoading] = useState(true);    //me page ek ptn gddi load wewi thiyenne eki true kiyl dnne
// 	const navigate = useNavigate();        //useNavigate use krnne page athr maru wenn

//     useEffect(   //setfunction ekk nis ekpr godk run weno ek wlwkw gnn useeffect fuction ekk deno eken  ek pr eki run wenne
//         () => {
// 			if (isloading == true){        //isloading ek true nm withri axios ek athule thiyen fuction ek run wenne false nm run wenne ne
// 				axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {     //axios ekn krnne db ekt gihin data tik load kr gnn ek
//                 console.log(res.data);
//                 setProducts(res.data)  //setproduct = setfuction
// 				setIsLoading(false);  // ptn gniddi load wewi thiyenne load wel iwr un kiyl kiynn thmi  false  dnne
//             });
// 			}        
            
//         },[isloading]  //useeffect dn kot[] mek aniwryenm dnn on,mehem arry ekkt kiynne deffendencis arry kiyl,isloading eke value ek wens unoth e kiynne true hri false hri unoth useEffect ek athule thiyen axios ek aphu run weno
//     )            // page ekk table load krn kot ekt aniwaryenm thiyenn on table ekt adala arry ekk [], loader ekk,useEffect ekk on weno athule if ekk thiyen saha diffendency arry ekk on loader ek dnn
// 	  //meken wenne api product ui eke pennana product ekk delete klm e delete krn ek product ek delete unth ui eke penno.ek nis api manually page ek refresh klm thmi ek ethnin pennana ek nethi wenne.mek demm passe auto load wimk weno.ek nis api mnually refresh krnn one ne (13-25)
 
// 	function deleteProduct(productId) {            //deleteProduct ek athult denne productId ek withri
// 		const token = localStorage.getItem("token");
// 		if (token == null) {
// 			toast.error("Please login first");
// 			return;
// 		}
// 		axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {             //delete request ekk ywno backend ekt agata productid ek dl,function ek run unoth adala productid ek agata dl ywno
// 				headers: {
// 					Authorization: "Bearer " + token,       //Bearer token ekth dl ywnne
// 				},
// 			})
// 			.then(() => {
// 				toast.success("Product deleted successfully");
// 				setIsLoading(true);
// 			})
// 			.catch((e) => {
// 				toast.error(e.response.data.message);
// 			});
// 	}



// 	return (
// 		<div className="w-full h-full  max-h-full overflow-y-scroll relative">
// 			<Link to="/admin/add-product" className="absolute text-5xl cursor-pointer bottom-5 right-4 bg-red-500 p-2 text-white py-2 px-4 rounded text-center flex fleex-center items-center">+</Link>   {/* add product.jsx ek link krl thiyenne*/}
//             { isloading ?      //isloading ek load wewi nm thiyenne Loading ek penn ehm neththn table ek penn.thith dekn kiynne table ek penn kiyl
// 			<div className="w-full h-full flex justify-center items-center ">
// 					<div className="w-[70px] h-[70px] border-[5px] border-gray-300 border-t-blue-900 rounded-full animate-spin">  {/*animate-spin ekn animate ekk hdnn plwn*/}
// 					</div>
// 			</div> :  
// 			<table className="w-full text-center">
// 				<thead>
// 					<tr>
// 						<th>Product ID</th>
// 						<th>Name</th>
// 						<th>Image</th>
// 						<th>Labelled Price</th>
// 						<th>Price</th>
// 						<th>Stock</th>
// 					</tr>
// 				</thead>
// 				{  // mek {} dl linne html athule javascript liyn nis
//                     <tbody>
// 					{products.map((item, index) => {  // map ekn krnne arrow ek athule thiyen ekkenk argen eyw run krno,item ekk kiyl methn kiynne.product e product thmi item widiyt mthnt pss wel enne,index kiyl kiynne run krnne kiweniyd kiyn ek
// 						return (
// 							<tr key={index}>   {/*methnt key ekk kiyl dnne genarete ekk wenkot newth newth ew awoth error ekk en nis*/}
// 								<td>{item.productId}</td>
// 								<td>{item.name}</td>
// 								<td>
//                                     <img src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder-image.jpg'} className="w-[50px] h-[50px]" />
//                                 </td>
// 								<td>{item.labelledPrice}</td>
// 								<td>{item.price}</td>
// 								<td>{item.stock}</td>
// 								<td>
// 									<div className="flex flex-col items-center w-full">
// 										<FaTrash className="text-[20px] text-red-500 mx-2 cursor-pointer" onClick={()=>{
// 											deleteProduct(item.productId); //deleteProduct function ek run weno onClick dunnm psse
// 										}}/>	   {/*mx-2 kiynne x akshye dekk athr gap ek.FaTrsh kiynne icon ek */}
// 										<FaEdit onClick={()=>{
// 											navigate ("/admin/edit-product/",{
// 												state: item          //mekn wenne api products page eke idn edit-product page ekt yn kot e data tikth arn yn ek.e kiynne api edit krnn klin api klin dpu data e adl bar wl penno
// 											})  //navigate ekn krnne edit product page ekt yn ek
// 										}}  className="text-[20px] text-blue-500 mx-2 cursor-pointer"/>
// 									</div>
// 								</td>
// 							</tr>
// 						);
// 					})}
// 				</tbody> }
// 			</table>}
//         </div>
//     )
// }    

