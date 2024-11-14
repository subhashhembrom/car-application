import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css'; 

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  const { id } = useParams(); // Getting the product ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cars/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setMessage('Error fetching product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle delete product
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Product deleted successfully.');
      navigate.push('/products'); // Redirect to product list page after deletion
    } catch (error) {
      setMessage('Error deleting product.');
    }
  };

  // Handle edit product
  const handleEdit = () => {
    navigate.push(`/edit-product/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div className="product-detail-page">
      <h1>Product Details</h1>
      {message && <div className="message">{message}</div>}

      <div className="product-detail">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Company:</strong> {product.company}</p>
          <p><strong>Dealer:</strong> {product.dealer}</p>
        </div>
      </div>

      <div className="product-actions">
        <button onClick={handleEdit} className="edit-btn">Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default ProductDetails;
