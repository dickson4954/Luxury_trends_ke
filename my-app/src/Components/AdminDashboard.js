import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { 
  FaTachometerAlt, FaUsers, FaBox, FaShoppingCart, FaChartLine,
  FaFileAlt, FaCog, FaSignOutAlt, FaBell, FaUserCircle,
  FaDollarSign, FaPercentage, FaArrowUp, FaArrowDown,
  FaCheckCircle, FaClock, FaTools, FaDatabase, FaImage,
  FaFileVideo, FaFile, FaHome
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Demo data
  const statsData = [
    { 
      title: 'Total Revenue', 
      value: 'KSh 1,254,320', 
      change: '+14.5%', 
      icon: <FaDollarSign />, 
      color: '#4CAF50',
      trend: 'up'
    },
    { 
      title: 'Total Orders', 
      value: '1,428', 
      change: '+12.3%', 
      icon: <FaShoppingCart />, 
      color: '#2196F3',
      trend: 'up'
    },
    { 
      title: 'Products', 
      value: '248', 
      change: '+8.2%', 
      icon: <FaBox />, 
      color: '#FF9800',
      trend: 'up'
    },
    { 
      title: 'Customers', 
      value: '856', 
      change: '+5.7%', 
      icon: <FaUsers />, 
      color: '#9C27B0',
      trend: 'up'
    },
  ];

  const recentOrders = [
    { id: '#1001', customer: 'John Doe', amount: 'KSh 12,500', status: 'completed', date: '2025-12-08' },
    { id: '#1002', customer: 'Jane Smith', amount: 'KSh 8,450', status: 'processing', date: '2025-12-08' },
    { id: '#1003', customer: 'Mike Johnson', amount: 'KSh 15,600', status: 'pending', date: '2025-12-07' },
    { id: '#1004', customer: 'Sarah Williams', amount: 'KSh 9,200', status: 'completed', date: '2025-12-07' },
    { id: '#1005', customer: 'David Brown', amount: 'KSh 6,350', status: 'processing', date: '2025-12-06' },
  ];

  const activities = [
    { id: 1, text: 'New order #1006 received', time: '5 min ago', icon: '🛒' },
    { id: 2, text: 'Product "LED Bulbs" updated', time: '1 hour ago', icon: '📦' },
    { id: 3, text: 'New customer registered', time: '2 hours ago', icon: '👤' },
    { id: 4, text: 'Monthly report generated', time: '1 day ago', icon: '📊' },
    { id: 5, text: 'System maintenance completed', time: '2 days ago', icon: '⚙️' },
  ];

  const orderStatusData = [
    { status: 'Completed', count: 65, color: '#4CAF50' },
    { status: 'Processing', count: 20, color: '#2196F3' },
    { status: 'Pending', count: 10, color: '#FFC107' },
    { status: 'Cancelled', count: 5, color: '#F44336' },
  ];

  const salesData = [
    { month: 'Jan', revenue: 40000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 52000 },
    { month: 'Apr', revenue: 48000 },
    { month: 'May', revenue: 62000 },
    { month: 'Jun', revenue: 55000 },
    { month: 'Jul', revenue: 71000 },
  ];

  const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { id: 'orders', label: 'Orders', icon: <FaShoppingCart />, badge: '42' },
    { id: 'products', label: 'Products', icon: <FaBox />, badge: '5' },
    { id: 'customers', label: 'Customers', icon: <FaUsers /> },
    { id: 'analytics', label: 'Analytics', icon: <FaChartLine /> },
    { id: 'reports', label: 'Reports', icon: <FaFileAlt /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  // Check if user is admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    const userStr = localStorage.getItem('user');

    if (!token || isAdmin !== 'true') {
      navigate('/');
      return;
    }

    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      setUser({
        full_name: "Ituriu Admin",
        username: "ituriuadmin",
        email: "admin@ituriu.co.ke",
        is_admin: true
      });
    }

    setTimeout(() => setLoading(false), 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <FaCheckCircle className="text-success" />;
      case 'processing': return <FaTools className="text-info" />;
      case 'pending': return <FaClock className="text-warning" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`admin-dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Top Navigation Bar */}
      <nav className="admin-top-nav">
        <div className="nav-left">
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="page-info">
            <h1>Dashboard</h1>
            <p className="breadcrumb">Home / Dashboard</p>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="nav-actions">
            <button className="nav-btn" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="nav-btn" onClick={() => navigate('/')}>
              <FaHome /> Store
            </button>
            <button className="nav-btn notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
          </div>
          
          <div className="user-profile-dropdown">
            <div className="user-info">
              <div className="user-avatar">
                {user?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="user-details">
                <span className="user-name">{user?.full_name || 'Admin'}</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            {!sidebarCollapsed && <span className="logo-text">Ituriu Admin</span>}
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {sidebarMenu.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </>
              )}
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <div className="system-status">
            <div className="status-item">
              <FaDatabase />
              <span>Database: 65%</span>
            </div>
            <div className="status-item">
              <FaImage />
              <span>Storage: 42%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h2>Welcome back, {user?.full_name?.split(' ')[0] || 'Admin'}! 👋</h2>
            <p>Here's what's happening with your store today.</p>
          </div>
          <div className="current-date">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-header">
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                  {stat.icon}
                </div>
                <div className="stat-change">
                  {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                  <span style={{ color: stat.trend === 'up' ? '#4CAF50' : '#F44336' }}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          {/* Sales Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Sales Overview</h3>
              <select className="chart-period">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="chart-container">
              <div className="bar-chart">
                {salesData.map((item, index) => (
                  <div key={index} className="bar-column">
                    <div 
                      className="bar" 
                      style={{ 
                        height: `${(item.revenue / 80000) * 100}%`,
                        backgroundColor: index % 2 === 0 ? '#4CAF50' : '#2196F3'
                      }}
                    >
                      <div className="bar-value">KSh {item.revenue.toLocaleString()}</div>
                    </div>
                    <span className="bar-label">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Status Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Order Status</h3>
            </div>
            <div className="order-status-chart">
              <div className="pie-chart-container">
                <div className="pie-chart">
                  {orderStatusData.map((item, index) => {
                    const total = orderStatusData.reduce((sum, d) => sum + d.count, 0);
                    const percentage = (item.count / total) * 100;
                    return (
                      <div key={index} className="pie-segment">
                        <div 
                          className="segment" 
                          style={{ 
                            '--percentage': percentage,
                            '--color': item.color
                          }}
                        >
                          <div className="segment-info">
                            <span className="segment-label">{item.status}</span>
                            <span className="segment-value">{percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="pie-legend">
                {orderStatusData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                    <span className="legend-label">{item.status}</span>
                    <span className="legend-value">{item.count} orders</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders & Activities */}
        <div className="bottom-row">
          {/* Recent Orders */}
          <div className="recent-orders-card">
            <div className="card-header">
              <h3>Recent Orders</h3>
              <button className="view-all-btn">View All →</button>
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="order-id">
                        <strong>{order.id}</strong>
                      </td>
                      <td className="customer">{order.customer}</td>
                      <td className="amount">{order.amount}</td>
                      <td className="status">
                        <span className={`status-badge ${order.status}`}>
                          {renderStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="date">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="activities-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <span className="activities-count">{activities.length}</span>
            </div>
            <div className="activities-list">
              {activities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Storage Status */}
        <div className="storage-card">
          <div className="card-header">
            <h3>Storage Status</h3>
          </div>
          <div className="storage-progress">
            <div className="storage-item">
              <div className="storage-info">
                <FaFile />
                <span>Documents</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
              <span className="storage-percentage">75%</span>
            </div>
            <div className="storage-item">
              <div className="storage-info">
                <FaImage />
                <span>Images</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
              </div>
              <span className="storage-percentage">45%</span>
            </div>
            <div className="storage-item">
              <div className="storage-info">
                <FaFileVideo />
                <span>Videos</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
              <span className="storage-percentage">60%</span>
            </div>
            <div className="storage-item">
              <div className="storage-info">
                <FaDatabase />
                <span>Database</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '30%' }}></div>
              </div>
              <span className="storage-percentage">30%</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;