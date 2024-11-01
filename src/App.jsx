import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import Home from "./Home";
import Nonveg from "./Nonveg";
import PurchaseHistory from "./PurchaseHistory";
import Veg from "./Veg";
import './App.css'
import { useSelector } from "react-redux";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FaceBookLoginComponent from "./FaceBookLoginComponent";

function App()
{
  const cart=useSelector((state)=>state.cart);
  const totalItems=cart.reduce((sum,item)=>sum+item.quantity,0);
  return(
    <>
    
    <FaceBookLoginComponent/>
    <GoogleOAuthProvider clientId="675997050265-ff8gbe1bmp5e8r6s7aq8g3937f9jnmg3.apps.googleusercontent.com">

    <GoogleLoginComponent/>
   

    </GoogleOAuthProvider>
      
    <Router>
    
    
<Link to='/home'>Home</Link>
<Link to='/veg'>Veg</Link>
<Link to='/nonveg'>Nonveg</Link>
<Link to='/cart'>Cart{totalItems}</Link>
<Link to='/purchasehistory'>PurchaseHistory</Link>
<Link to='/aboutus'>AboutUs</Link>
<Link to='/contactus'>ContactUs</Link>

<Routes>
  <Route path="/home" element={<Home></Home>}></Route>
<Route path="/veg" element={<Veg></Veg>}></Route>
<Route path="/nonveg" element={<Nonveg></Nonveg>}></Route>
<Route path="/cart" element={<Cart></Cart>}></Route>
<Route path="/purchasehistory" element={<PurchaseHistory></PurchaseHistory>}></Route>
<Route path="/aboutus" element={<AboutUs></AboutUs>}></Route>
<Route path="/contactus" element={<ContactUs></ContactUs>}></Route>

</Routes>

    </Router>
    
    </>
  )
}
export default App;