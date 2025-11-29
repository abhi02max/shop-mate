import { Link, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/cartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";


const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const [cartCount, setCartCount] = useState(0);  
    useEffect(() => {
        const count = cart.reduce((accumulator, currentItem) => 
            accumulator + currentItem.amount, 0
        );
        setCartCount(count);
    }, [cart]);

    const handleLogout = () => {
        logout();
        Navigate("/login");
    } ;


    return (
        <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '20px', 
      background: '#eee', 
      alignItems: 'center' 
    }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
        Shop-Mate 🛍️
      </Link>

      <Link to="/cart" style={{ textDecoration: 'none', fontSize: '18px' }}>
        Cart 🛒 
        <span style={{ 
          background: 'red', 
          color: 'white', 
          borderRadius: '50%', 
          padding: '2px 8px', 
          marginLeft: '5px',
          fontSize: '14px' 
        }}>
          {cartCount}
        </span>
      </Link>
      {user ? (
          // If User is Logged In:
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Hi, {user.username}</span>
            <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          // If User is Guest:
          <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>Login</Link>
        )}
    </nav>
  );
};

export default Navbar;