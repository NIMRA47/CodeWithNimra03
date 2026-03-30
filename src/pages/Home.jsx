import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoIosWarning } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(stored);
  }, []);

  // STATS
  const totalProducts = products.length;
  const categories = [...new Set(products.map(p => p.category))].length;
  const lowStock = products.filter(p => p.status === 'Low Stock').length;
  const outOfStock = products.filter(p => p.status === 'Out of Stock').length;
  const inventoryValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const avgPrice = totalProducts ? (products.reduce((sum, p) => sum + p.price, 0) / totalProducts).toFixed(2) : 0;
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);

  // CATEGORY COUNTS
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const recent = [...products].reverse().slice(0, 5);

  const statusColor = (status) => {
    if (status === 'In Stock') return '#00c896';
    if (status === 'Low Stock') return '#f59e0b';
    return '#ef4444';
  };

  const categoryColors = ['#6c3fd6', '#00c896', '#f43f5e', '#f59e0b', '#3b82f6', '#ec4899'];

  return (
    <div className='home-page'>

      {/* STAT CARDS */}
      <div className='stats-grid'>
        <div className='stat-card'>
          <div className='stat-icon purple-bg'><HiOutlineShoppingCart /></div>
          <h2>{totalProducts}</h2>
          <p>Total Products</p>
          <span className='sub purple-text'>In catalog</span>
        </div>
        <div className='stat-card'>
          <div className='stat-icon teal-bg'><MdOutlineCategory /></div>
          <h2>{categories}</h2>
          <p>Categories</p>
          <span className='sub teal-text'>Active</span>
        </div>
        <div className='stat-card'>
          <div className='stat-icon red-bg'><IoIosWarning /></div>
          <h2>{lowStock} / {outOfStock}</h2>
          <p>Low / Out Stock</p>
          <span className='sub red-text'>Need attention</span>
        </div>
        <div className='stat-card'>
          <div className='stat-icon green-bg'><LuChartNoAxesCombined /></div>
          <h2>${inventoryValue.toLocaleString()}</h2>
          <p>Inventory Value</p>
          <span className='sub green-text'>Total worth</span>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className='bottom-section'>

        {/* RECENT ACTIVITY */}
        <div className='recent-box'>
          <div className='recent-header'>
            <h3>🕐 Recent Activity</h3>
            <button onClick={() => navigate('products')}>View all →</button>
          </div>

          {recent.length === 0 ? (
            <p className='no-products'>No products yet. Add some!</p>
          ) : (
            recent.map(product => (
              <div className='activity-item' key={product.id}>
                <div className='activity-left'>
                  <div className='product-img'>
                    {product.image
                      ? <img src={product.image} alt={product.name} />
                      : <span>📦</span>}
                  </div>
                  <div>
                    <h4>{product.name}</h4>
                    <div className='activity-meta'>
                      <span className='category-badge'>{product.category}</span>
                      <span className='date'>
                        {new Date(product.id).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='activity-right'>
                  <span className='price'>${product.price}</span>
                  <span style={{ color: statusColor(product.status), fontSize: '12px' }}>
                    ● {product.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className='right-panel'>
          <div className='category-box'>
            <h3>By Category</h3>
            {Object.entries(categoryCounts).map(([cat, count], i) => (
              <div className='category-row' key={cat}>
                <div className='category-info'>
                  <span>{cat}</span>
                  <span className='cat-count'>{count} items</span>
                </div>
                <div className='progress-bar-bg'>
                  <div className='progress-bar-fill' style={{
                    width: `${(count / totalProducts) * 100}%`,
                    backgroundColor: categoryColors[i % categoryColors.length]
                  }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className='quick-stats'>
            <h3>QUICK STATS</h3>
            <div className='qs-row'><span>Avg Price</span><span>${avgPrice}</span></div>
            <div className='qs-row'><span>Total Units</span><span>{totalUnits}</span></div>
            <div className='qs-row'><span>Out of Stock</span><span>{outOfStock}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;