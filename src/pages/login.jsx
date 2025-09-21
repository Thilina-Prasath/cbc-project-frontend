import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { GrGoogle } from "react-icons/gr"
import { useNavigate } from "react-router-dom"

export default function LoginPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()  //navigate mek use krl page athr ikmnt navigate krnn plwn

    const googleLogin  = useGoogleLogin({
        onSuccess: (response)=>{
            const accessToken = response.access_token
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login/google", {
                accessToken: accessToken
            }).then((response)=>{
                toast.success("Login Successful")
                const token = response.data.token
                localStorage.setItem("token", token)
                if(response.data.role === "admin"){
                    navigate("/admin/")
                }
                else{
                    navigate("/")
                }
            })
        }
    })



    async function handleLogin(){
        //console.log(email)    /*mekedi wenne login ek ebuwm email eke saha password eke http request ekk backend ekt yn ek*/
        //console.log(password)
 
        try{
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL +"/api/users/login",{   //awit ek dnne meken lbenne promiss ekk nis,axios.post ekn wenne me thiyen url ek ynn on then,,mehem dnne  import.meta.env.VITE_BACKEND_URL common api url ek use krn nis
            email:email,           //ywnn on json ek
            password:password
        })

        toast.success("Login successful");   //notification lesiyen penn plwn
        console.log(response.data)
        localStorage.setItem("token",response.data.token)  //token ek localstorage ek store kr gnno

        if(response.data.role?.startsWith("admin") ){   //admin ekenk d kiyl role ek check krn
            navigate("/admin/")         // window.location.href ekt wd godk smooth  
            //window.location.href = "/admin"    //admin kenek nm log unm psse admin site ekt ywnn
        }else{
            navigate("/")
            //window.location.href = "/"   //admin kenek nowe nm user kenek nm log unm psse home site ekt ywnn
        }
      
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
                    type="email"
                    placeholder="email"

                    className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px]"/>
                    <input  onChange={
                        (e)=>{    {/*e wlin krnne api krn siylum wens km penno.e kiynne email ek wens klm klin mail ek aluth mail ek saha time ek penno*/} 
                            setPassword(e.target.value)                        
                        }
                    }

                    value={password}
                    
                    type="password"
                    placeholder="password"
                    className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px]" />
                    <button onClick={handleLogin}className="w-[300px] h-[50px] bg-[#c3efe9] rounded-[20px] my-[20px] text-white cursor-pointer">login</button>

                    {/*google login*/}
                    <button onClick={googleLogin} className="w-[300px] cursor-pointer h-[50px] flex justify-center items-center bg-[#c3efe9] rounded-[20px] my-[20px] text-[20px] font-bold text-white" >
                    <GrGoogle className="text-xl text-gray-600 cursor-pointer hover:text-gray-800" />  {/*google logo*/}
                    <span className="text-gray-600 text-xl font-semibold">Login with Google</span>
                    </button>

                    <span className="text-gray-600 text-sm mt-[20px]">Don't have an account? <a href="/signup" className="text-[#c3efe9] underline">SIGNIN</a></span>  



                </div>

            </div>
        </div>
    )
}