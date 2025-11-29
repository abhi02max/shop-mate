import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/cartContext.jsx";

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const [cartCount, setCartCount] = useState(0);  
    useEffect(() => {
        const count = cart.reduce((accumulator, currentItem) => 
            accumulator + currentItem.amount, 0
        );
        setCartCount(count);
    }, [cart]);

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
    </nav>
  );
};

export default Navbar;