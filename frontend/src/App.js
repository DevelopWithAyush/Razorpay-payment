import './App.css';
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from './Home';
import PaymentSucess from './PaymentSucess';
function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path='/' element= {<Home/>}/>
    <Route path='/paymentsuccess' element ={<PaymentSucess/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
