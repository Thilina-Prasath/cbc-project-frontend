import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function LoginPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    async function handleLogin(){
        //console.log(email)    /*mekedi wenne login ek ebuwm email eke saha password eke http request ekk backend ekt yn ek*/
        //console.log(password)
 
        try{
            const response = await axios.post("http://localhost:3000/api/users/login",{         //awit ek dnne meken lbenne promiss ekk nis,axios.post ekn wenne me thiyen url ek ynn on then
            email:email,           //ywnn on json ek
            password:password
        })

        toast.success("Login successful");   //notification lesiyen penn plwn
        console.log(response.data)
      
        }catch(e){
            toast.error(e.response.data.message);
        }
        
    }
    return(
        <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex justify-evenly items-center ">  {/*back ground ekk add krno*/}
            <div className="w-[50%] h-full ">   {/*screen ekdekt bedno*/}

            </div>
            <div className="w-[50%] h-full flex justify-center items-center "> {/*screen ekdekt bedno*/}
                <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center"> {/*aluth ekk dl ek blue krno*/}
                    <input onChange={
                        (e)=>{    {/*e wlin krnne api krn siylum wens km penno.e kiynne email ek wens klm klin mail ek aluth mail ek saha time ek penno*/} 
                            setEmail(e.target.value)                        
                        }
                    }

                    value={email}

                    className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px]"/>
                    <input  onChange={
                        (e)=>{    {/*e wlin krnne api krn siylum wens km penno.e kiynne email ek wens klm klin mail ek aluth mail ek saha time ek penno*/} 
                            setPassword(e.target.value)                        
                        }
                    }

                    value={password}
                    
                    type="password" className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px]" />
                    <button onClick={handleLogin}className="w-[300px] h-[50px] bg-[#c3efe9] rounded-[20px] my-[20px] text-white cursor-pointer">login</button>



                </div>

            </div>
        </div>
    )
}