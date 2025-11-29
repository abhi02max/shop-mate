import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ textAlign: "center" }}>⏳ Loading product details...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>⚠️ {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div style={{ padding: "40px", display: "flex", gap: "50px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Left: Image */}
      <div style={{ flex: 1 }}>
        <img src={product.image} alt={product.title} style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} />
      </div>

      {/* Right: Info */}
      <div style={{ flex: 1 }}>
        <h1>{product.title}</h1>
        <h3 style={{ color: "gray" }}>Category: {product.category}</h3>
        <p style={{ lineHeight: "1.6" }}>{product.description}</p>
        <h2 style={{ color: "green" }}>${product.price}</h2>

        <button
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.title} to cart`}
          style={{ background: "black", color: "white", border: "none", padding: "15px 30px", fontSize: "1.2rem", cursor: "pointer" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;