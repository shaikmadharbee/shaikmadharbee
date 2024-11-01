import { useDispatch, useSelector } from "react-redux";
import { decreament, increament, remove } from "./store";
import { useState } from "react";

function Cart()
{ 
  const [discount, setDiscount] = useState(0);
  const[couponCode,setCouponCode]=useState("");
  const [couponDiscount,setcouponDiscount]=useState(0);
  
  const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart); // Fallback to an empty array if cart is undefined

  // Function to calculate totals (original, discounted, and savings)
  const calculateTotals = () => {
    const originalTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = originalTotal - (originalTotal * discount) / 100;
    const savings=discountedTotal-couponDiscount;
    
   
    return {
      originalTotal: originalTotal.toFixed(2),
      discountedTotal: discountedTotal.toFixed(2),
      savings: savings.toFixed(2),
    };
  };

  // Destructure the totals
  const { originalTotal, discountedTotal, savings } = calculateTotals();

  // Apply specific percentage discount
  const applyDiscount = (percent) => {
    setDiscount(percent);
  };


  
  const handleApplyCoupon=()=>{
    let percent=0;
    switch(couponCode){
      case 'Madharbee10':
        setcouponDiscount(percent);
        percent=10;
        break;
        case 'Madharbee20':
          setcouponDiscount(percent);
          percent=20;
          break;
          default:
            alert('invalid coupon code');
            
              return;
            
    }
    setDiscount(prevDiscount=>prevDiscount+percent);
  }






    const items = cartItems.map((item, index) => (
        <li key={index}>
            {`${item.name} - $${item.price.toFixed(2)} - ${item.quantity}`}
            <button onClick={() => dispatch(increament({ name: item.name }))}>+1</button>
            <button onClick={() => dispatch(decreament({ name: item.name }))}>-1</button>
            <button onClick={() => dispatch(remove(item))}>Remove</button>
        </li>))
        
        
    


return(
  <>
   <div>
        {items.length === 0 ? (
         <h2>Cart is empty.</h2>
         ) : (
      <div>
    <h2>Cart Page</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
      </div>
    )}
  </div>
  <h4>Total bill before discount: ${originalTotal}</h4>
    
      <button style={{ marginRight: '10px' }} onClick={() => applyDiscount(10)}>Apply Discount 10%</button>
      <button style={{ marginRight: '10px' }} onClick={() => applyDiscount(20)}>Apply Discount 20%</button>
      <button onClick={() => applyDiscount(30)}>Apply Discount 30%</button>
<div>


      <input type="text"
      value={couponCode}
      onChange={(e)=>setCouponCode(e.target.value)}
      placeholder="enter coupon code"/>
      <button onClick={handleApplyCoupon}>Apply coupon</button>
</div>



      <p>Discount percentage applied: {discount}%</p>
      <p>Discount amount: ${savings}</p>
      <h4>Final bill after discount: ${discountedTotal}</h4>
      

  </>
)

}      
  
export default Cart;