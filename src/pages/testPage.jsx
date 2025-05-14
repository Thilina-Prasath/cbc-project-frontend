import { useState } from "react";

export default function TestPage(){
    const[count,setCount] = useState(0)
    const[status,setStatus] = useState("passed")
    //a= variable
    //b= function

    return (
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <div className="w-[450px] h-[250px] shadow flex justify-center items-center">
                <button onClick={()=>{
                    setCount(count-1)
                }}className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer"> 
                    -
                </button>
                <span className="text-[50px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center">
                    {count}
                </span>
                <button onClick={()=>{
                    setCount(count+1)

                }} className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer"> 
                    +
                </button>

            </div>
            <div className="w-[450px] h-[250px] shadow flex flex-col justify-center items-center">
                <span className="text-[50px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center">
                    {status}
                </span>
                <div>
                    <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]"
                    onClick={()=>{
                        setStatus("passed")
                    }}> 
                        passed
                    </button>
                    <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]"
                    onClick={()=>{
                        setStatus("failed")
                    }}>  
                        Failed
                    </button>
                </div>
            </div>


        </div>
    )
}