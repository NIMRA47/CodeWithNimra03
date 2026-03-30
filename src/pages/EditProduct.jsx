import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageMode, setImageMode] = useState('url');
  const [form, setForm] = useState({
    name: '', category: '', price: '', quantity: '', description: '', image: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    const product = stored.find(p => p.id === parseInt(id));
    if (product) setForm(product);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!form.name || !form.category || !form.price || !form.quantity) {
      alert('Please fill all required fields!');
      return;
    }

    const stored = JSON.parse(localStorage.getItem('products')) || [];
    const updated = stored.map(p => p.id === parseInt(id) ? {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
      status: parseInt(form.quantity) === 0
        ? 'Out of Stock'
        : parseInt(form.quantity) <= 10
        ? 'Low Stock'
        : 'In Stock'
    } : p);

    localStorage.setItem('products', JSON.stringify(updated));
    alert('Product updated!');
    navigate('/dashboard/products');
  };

  return (
    <div className='addproduct'>
      <button className='back-btn' onClick={() => navigate('/dashboard/products')}>
        ← Back to Products
      </button>

      <h3 className='overview-label'>EDIT PRODUCT .</h3>
      <h1><span className="white">Edit </span><span className="blue">Product</span></h1>

      <div className='product-form'>
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
            <button className='submit-btn' onClick={handleUpdate}>
              💾 Update Product
            </button>
            <button className='cancel-btn' onClick={() => navigate('/dashboard/products')}>
              Cancel
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='rightscreen'>
          <label>PRODUCT IMAGE</label>
          <div className='image-upload-box'>
            {form.image
              ? <img src={form.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
              : <><span className='upload-icon'>📦</span><p>No image</p></>}
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
              ⬆ File
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

          <div className='tips-box'>
            <label>TIPS</label>
            <p>→ Quantity ≤ 10 triggers Low Stock</p>
            <p>→ Quantity = 0 marks Out of Stock</p>
            <p>→ Data persists via Local Storage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;