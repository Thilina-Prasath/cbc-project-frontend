import { useState } from "react"
import mediaUpload from "../utils/mediaUpload"

export default function TestPage(){
    
    const [image , setImage] = useState(null)

    

    function fileUpload(){
        
        mediaUpload (image).then(
            (res) =>{            //response ek widiyt enne image url ek
                console.log(res)
            }).catch(
                (res) =>{
                    console.log(res)
                })
    }

    // const url = awit mediaUpload(image)  ud function ek async wenn on
       

    return (
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <input type="file" className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e)=>{

                setImage(e.target.files[0])  //ek pr file godk upload wenn on nis

            }} />
            <button onClick={fileUpload} className="bg-green-500 text-white font-bold py-2 px-4 rounded">Upload</button>            

        </div>
    )}