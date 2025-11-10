import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import DevsPage from './pages/devs/DevsPage'

function App() {
 

  return (
    <>
    
    <BrowserRouter>
      <Navbar />
    <Routes>
       <Route path="/devs" element={<DevsPage />}/>
    </Routes>
      <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
