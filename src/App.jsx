import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import AdminPage from "./pages/adminPage"
import TestPage from "./pages/testPage"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <BrowserRouter>
    <div>
      <Toaster position="top-center"/>  {/*notification ek enn on position ek.*/}
      <Routes path="/*">         {/*Dynamic kotuwk hdnn gththe routes.ek athule thmi route thiyenne*/}
          <Route path="/" element={<HomePage/>}/>       {/*Route ekk kiynne ek awsthwkdi penn on deyk*/}
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/signup" element={<RegisterPage/>}/>
          <Route path="/testing" element={<TestPage/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>      {/*/admin/* admin ekth ekk adminge psse mkk hri deyk ekthu wenw nm /* mehm dno*/}
          <Route path='/*' element={<h1>404 Not Found</h1>}/>      {/*kisim url ekkt gelpenne nethi ekkt awm */}

      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
