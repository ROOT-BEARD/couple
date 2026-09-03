import Dashboard from "./pages/SendPage"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import AccountPage from "./pages/AccountPage"
import ReadPage from "./pages/ReadPage"
import Header from "./components/Footer"


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/readPage" element={<ReadPage/>}/>
        <Route path="/account" element={<AccountPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
