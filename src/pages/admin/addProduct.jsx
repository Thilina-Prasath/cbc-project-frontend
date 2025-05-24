import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";


export default function AddProductPage(){

    const [productId, setProductId] = useState("");
	const [name, setName] = useState("");
	const [altNames, setAltNames] = useState("");
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);  //images godk awoth ek me array ekt dl enne
	const [labelledPrice, setLabelledPrice] = useState(0);
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
    const navigate = useNavigate()        //ek thnk idn thw thenkt ynn useNavigate ek dno

    async function AddPrdouct(){

        const token = localStorage.getItem("token");   //api log wen kot gnn token ek gnno methnt
        if (token == null) {   //ehem token ekk browser eke save wel neththn mehem messg ekk penn kiyno.ehm token ekk nethi wenne user kenek log wel nththn
            toast.error("Please login first");
            return
        }

        if(images.length<=0){
            toast.error ("Please add at least one image");
            return
        }

        const promisesArray = [];  //images 5k awoth ek me arry ekt dl thiyeno,,arry eke en images gnt promisse hdeno

		for (let i = 0; i < images.length; i++) {    //en images arry ek ekin ek kiywno
			promisesArray[i] = mediaUpload(images[i]);   
		}
		try {
			const imageUrls = await Promise.all(promisesArray);      //hmbwen promises gn arry ekkt dno
			console.log(imageUrls);

            const altNamesArray = altNames.split(",")   // mekk hri split ekk koma thiye nm e koma wen wel arry ekk widiyt eno ex-(mango,orange,food)

            const product = {
                productId : productId,
                name : name,
                altNames : altNamesArray,
                description : description,
                images : imageUrls,
                labelledPrice : labelledPrice,
                price : price,
                stock : stock,
            }
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product , {
                headers : {
                    "Authorization" : "Bearer "+token      //api token ekth ywno,Bearer dno nthtn ynne ne
                }
            }).then(() => {
                toast.success("Product added successfully")
                navigate("/admin/products")   
            }).catch((e) => {
                toast.error(e.response.data.message)
            })

		} catch (e) {
			console.log(e);
		}


    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
			<input
				type="text"
				placeholder="Product ID"
				className="input input-bordered w-full max-w-xs"
				value={productId}
				onChange={(e) => {
					setProductId(e.target.value);
				}}
		    />
            <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={(e) =>{
                setName(e.target.value)
            }}
            />
            <input
                type="text"
                placeholder="Alternative Names"
                className="input input-bordered w-full max-w-xs"
                value={altNames}
                onChange={(e) =>{
                    setAltNames(e.target.value)
                    }}
            />
            <input
                type="text"
                placeholder="Description"
                className="input input-bordered w-full max-w-xs"
                value={description}
                onChange={(e) =>{
                setDescription(e.target.value)
            }}
            />
            <input
				type="file"
				placeholder="Images"
				multiple   //multiple demm usert plwn onthrm photo upload krnn 
				className="input input-bordered w-full max-w-xs"
				onChange={(e) => {
					setImages(e.target.files);
				}}
			/>
			<input
				type="number"
				placeholder="Labelled Price"
				className="input input-bordered w-full max-w-xs"
				value={labelledPrice}
				onChange={(e) => {
					setLabelledPrice(e.target.value);
				}}
			/>
			<input
				type="number"
				placeholder="Price"
				className="input input-bordered w-full max-w-xs"
				value={price}
				onChange={(e) => {
					setPrice(e.target.value);
				}}
			/>
			<input
				type="number"
				placeholder="Stock"
				className="input input-bordered w-full max-w-xs"
				value={stock}
				onChange={(e) => {
					setStock(e.target.value);
				}}
			/>
            <div className="w-full flex justify-center flex-row items-center mt-4">
				<Link to="/admin/products" className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4">Cancel</Link>
				<button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={AddPrdouct}>Add Product</button>
            </div>
        </div>

    )
}