import { useContext } from "react";
import { CartContext } from "../context/cartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
    const { cart, clearCart, removeFromCart, increaseAmount, decreaseAmount, total } = useContext(CartContext);

    const handleCheckout = () => {
    if (user) {
        // If logged in, go to success page
        navigate('/checkout');
        // You would usually also clearCart() here
    } else {
        // If NOT logged in, go to login
        navigate('/login');
    }
};

      if (cart.length === 0) {
         return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Your Cart is Empty 😔</h2>
          <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go Shopping</Link>
        </div>
      );
      }
    return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>

      {/* LINE C: Mapping the Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', borderBottom: '1px solid #ccc', paddingBottom: '20px', alignItems: 'center' }}>
            
            {/* Thumbnail */}
            <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />

            {/* Title & Price */}
            <div style={{ flex: 1, paddingLeft: '20px' }}>
              <h4>{item.title}</h4>
              <p>${item.price} x {item.amount}</p>
              <p style={{ fontWeight: 'bold' }}>Total: ${(item.price * item.amount).toFixed(2)}</p>
            </div>

            {/* LINE D: Controls (+ / - / Trash) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              
              {/* Decrease Button */}
              <button 
                onClick={() => decreaseAmount(item.id)}
                style={{ background: '#ddd', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              > - </button>

              <span>{item.amount}</span>

              {/* Increase Button */}
              <button 
                onClick={() => increaseAmount(item.id)}
                style={{ background: '#ddd', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              > + </button>

              {/* Remove Button */}
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginLeft: '10px' }}
              > 🗑️ </button>
            </div>

          </div>
        ))}
      </div>

      {/* LINE E: The Summary Section */}
      <div style={{ marginTop: '30px', textAlign: 'right', borderTop: '2px solid black', paddingTop: '20px' }}>
        <h2>Total: ${total.toFixed(2)}</h2>
        
        <button 
          onClick={clearCart}
          style={{ background: 'red', color: 'white', border: 'none', padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}
        >
          Clear Cart
        </button>
        
        <button onClick={handleCheckout}
          style={{ background: 'green', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
        >
          Checkout
        </button>
      </div>

    </div>
  );
};

export default Cart;
