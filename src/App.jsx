import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import AdminPage from "./pages/adminPage"

function App() {

  return (
    <BrowserRouter>
    <div>
      <Routes path="/*">         {/*Dynamic kotuwk hdnn gththe routes.ek athule thmi route thiyenne*/}
          <Route path="/" element={<HomePage/>}/>       {/*Route ekk kiynne ek awsthwkdi penn on deyk*/}
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>      {/*/admin/* admin ekth ekk adminge psse mkk hri deyk ekthu wenw nm /* mehm dno*/}
          <Route path='/*' element={<h1>404 Not Found</h1>}/>      {/*kisim url ekkt gelpenne nethi ekkt awm */}

      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
