import { useContext, useState, useEffect } from "react";    
import { CartContext } from "../context/cartContext.jsx";
import { Link } from "react-router-dom";

const Home = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {   
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
      <h1>Latest Products</h1>
      
      {/* 4. THE GRID LAYOUT */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            
            {/* IMAGE */}
            <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={product.image} alt={product.title} style={{ maxHeight: '160px' }} />
            </div>

            {/* TITLE & PRICE */}
            <h4 style={{ height: '40px', overflow: 'hidden' }}>{product.title}</h4>
            <p style={{ fontWeight: 'bold' }}>${product.price}</p>
            
            {/* ACTIONS */}
            <div style={{ display: 'flex', gap: '10px' }}>
              
              {/* LINK TO DETAILS */}
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                View Details
              </Link>
              
              {/* ADD TO CART BUTTON */}
              {/* When clicked, we send the WHOLE product object to our Context */}
              <button 
                onClick={() => addToCart(product)}
                style={{ background: 'black', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Add to Cart
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;