import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import AdminPage from "./pages/adminPage"
import TestPage from "./pages/testPage"
import { Toaster } from "react-hot-toast"
import { GoogleOAuthProvider } from "@react-oauth/google"
import ForgetPasswordPage from "./pages/forgetPassword"

function App() {

  return (
    <GoogleOAuthProvider clientId = "316269321757-orclagd9f2iocsm01hc9q4f59nu2rlcr.apps.googleusercontent.com">
    <BrowserRouter>
    <div>
      <Toaster position="top-right"/>  {/*notification ek enn on position ek.*/}
      <Routes path="/*">         {/*Dynamic kotuwk hdnn gththe routes.ek athule thmi route thiyenne*/}
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/forget" element={<ForgetPasswordPage/>}/>
          <Route path="/signup" element={<RegisterPage/>}/>
          <Route path="/testing" element={<TestPage/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>      {/*/admin/* admin ekth ekk adminge psse mkk hri deyk ekthu wenw nm /* mehm dno*/}
          <Route path="/*" element={<HomePage/>}/>       {/*Route ekk kiynne ek awsthwkdi penn on deyk*/}
          {/*<Route path='/*' element={<h1>404 Not Found</h1>}/>      kisim url ekkt gelpenne nethi ekkt awm */}

      </Routes>
    </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App