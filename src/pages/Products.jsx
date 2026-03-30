import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import { MdDelete } from "react-icons/md";
import '../App.css'
import { MdOutlineModeEdit } from "react-icons/md";
const Products = ({ search = '' }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(stored);
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      localStorage.setItem('products', JSON.stringify(updated));
      setProducts(updated);
    }
  };

  const statusColor = (status) => {
    if (status === 'In Stock') return '#00c896';
    if (status === 'Low Stock') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className='products-page'>
      <h3 className='overview-label'>INVENTORY .</h3>
      <h1><span className="white">All </span><span className="blue">Products</span></h1>

      <p className='results-count'>
        Showing {filtered.length} of {products.length} products
      </p>

      {products.length === 0 ? (
        <div className='empty-state'>
          <p>📦 No products found.</p>
          <button className='submit-btn' onClick={() => navigate('/dashboard/addproduct')}>
            + Add Product
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className='empty-state'>
          <p>🔍 No results for "{search}"</p>
        </div>
      ) : (
        <div className='products-table'>
          <div className='table-header'>
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {filtered.map(product => (
            <div className='table-row' key={product.id}>
              <div className='product-cell'>
                <div className='product-img'>
                  {product.image
                    ? <img src={product.image} alt={product.name} />
                    : <span>📦</span>}
                </div>
                <div>
                  <h4>{product.name}</h4>
                  <p className='product-desc'>{product.description?.slice(0, 40)}...</p>
                </div>
              </div>
              <span className='category-badge'>{product.category}</span>
              <span className='price'>${product.price}</span>
              <span className='qty'>{product.quantity}</span>
              <span style={{ color: statusColor(product.status), fontSize: '13px' }}>
                ● {product.status}
              </span>
              <div className='action-btns'>
                <button
                  className='edit-btn'
                  onClick={() => navigate(`/dashboard/editproduct/${product.id}`)}>
                  <MdOutlineModeEdit />Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(product.id)}>
                  <MdDelete /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;