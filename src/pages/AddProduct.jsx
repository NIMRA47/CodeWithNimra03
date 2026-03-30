import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const navigate = useNavigate();
  const [imageMode, setImageMode] = useState('url');
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validation
    if (!form.name || !form.category || !form.price || !form.quantity) {
      alert('Please fill all required fields!');
      return;
    }

    // Get existing products from localStorage
    const existing = JSON.parse(localStorage.getItem('products')) || [];

    // Create new product object
    const newProduct = {
      id: Date.now(),           // unique id
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
      description: form.description,
      image: form.image,
      status: parseInt(form.quantity) === 0
        ? 'Out of Stock'
        : parseInt(form.quantity) <= 10
        ? 'Low Stock'
        : 'In Stock'
    };

    // Save to localStorage
    const updated = [...existing, newProduct];
    localStorage.setItem('products', JSON.stringify(updated));

    alert('Product added successfully!');
    navigate('/dashboard');
  };

  return (
    <div className='addproduct'>
      <button className='back-btn' onClick={() => navigate('/dashboard')}>
        ← Back to Products
      </button>

      <h3 className='overview-label blue'>NEW PRODUCT .</h3>
      <h1><span className="white">Add </span><span className="blue">Product</span></h1>

      <div className='product-form'>
        {/* LEFT SIDE */}
        <div className='leftscreen'>
          <label>PRODUCT NAME <span className='required'>*</span></label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Wireless Earbuds Pro"
            value={form.name}
            onChange={handleChange}
          />

          <div className='row'>
            <div className='field'>
              <label>CATEGORY <span className='required'>*</span></label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div className='field'>
              <label>PRICE (USD) <span className='required'>*</span></label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>QUANTITY <span className='required'>*</span></label>
          <input
            type="number"
            name="quantity"
            placeholder="0"
            value={form.quantity}
            onChange={handleChange}
          />

          <label>DESCRIPTION</label>
          <textarea
            rows="5"
            name="description"
            placeholder="Product description..."
            value={form.description}
            onChange={handleChange}
          ></textarea>

          <div className='form-btns'>
            <button className='submit-btn' onClick={handleSubmit}>
              🗂 Add Product
            </button>
            <button className='cancel-btn' onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='rightscreen'>
          <label>PRODUCT IMAGE</label>
          <div className='image-upload-box'>
            <span className='upload-icon'>📦</span>
            <p>Click to upload</p>
          </div>

          <div className='image-toggle'>
            <button
              className={imageMode === 'url' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setImageMode('url')}>
              URL
            </button>
            <button
              className={imageMode === 'file' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setImageMode('file')}>
              File
            </button>
          </div>

          {imageMode === 'url' && (
            <input
              type="text"
              name="image"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
            />
          )}
          {imageMode === 'file' && (
            <input type="file" accept="image/*" />
          )}

        </div>
      </div>
    </div>
  );
}

export default AddProduct;
