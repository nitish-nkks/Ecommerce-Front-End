// src/components/Pages/OrderHistoryPage.jsx
import React, { useState } from 'react';
import { Package, Calendar, Truck, CheckCircle, Clock, Eye, Download, ArrowLeft, Search, Filter, Star, ChevronDown, RotateCcw } from 'lucide-react';

const OrderHistoryPage = ({ onNavigate, orders = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Mock orders data if none provided
  const mockOrders = orders.length > 0 ? orders : [
    {
      id: 'ORD-001234',
      date: '2024-12-10',
      status: 'delivered',
      items: [
        { name: 'AMOXIRUM TAB - Premium Antibiotic', quantity: 2, price: 159.50 },
        { name: 'Calgophos - Calcium Supplement', quantity: 1, price: 2281.10 }
      ],
      total: 2600.10,
      shippingAddress: 'New Delhi, India',
      paymentMethod: 'Card ending in 1234',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-001235',
      date: '2024-12-08',
      status: 'shipped',
      items: [
        { name: 'SOKRENA W.S. - Poultry Growth', quantity: 1, price: 3854.92 }
      ],
      total: 3903.92,
      shippingAddress: 'Mumbai, Maharashtra',
      paymentMethod: 'Cash on Delivery',
      trackingNumber: 'TRK123456790',
      estimatedDelivery: '2024-12-12'
    },
    {
      id: 'ORD-001236',
      date: '2024-12-05',
      status: 'processing',
      items: [
        { name: 'Vimeral Forte - Multi-Vitamin', quantity: 3, price: 688.00 },
        { name: 'Premium Fish Feed Pro', quantity: 1, price: 1250.00 }
      ],
      total: 3314.00,
      shippingAddress: 'Bangalore, Karnataka',
      paymentMethod: 'Card ending in 5678'
    },
    {
      id: 'ORD-001237',
      date: '2024-11-28',
      status: 'cancelled',
      items: [
        { name: 'Cattle Nutrition Plus Premium', quantity: 1, price: 2800.00 }
      ],
      total: 2849.00,
      shippingAddress: 'Chennai, Tamil Nadu',
      paymentMethod: 'Card ending in 9012',
      cancelReason: 'Requested by customer'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#10b981';
      case 'shipped': return '#3b82f6';
      case 'processing': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'processing': return <Clock size={16} />;
      case 'cancelled': return <Package size={16} />;
      default: return <Package size={16} />;
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'last30' && new Date(order.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
                       (dateFilter === 'last90' && new Date(order.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleTrackOrder = (trackingNumber) => {
    onNavigate('order-tracking', { trackingNumber });
  };

  return (
    <div className="order-history-page">
      <style jsx>{`
        .order-history-page {
          min-height: 100vh;
          background: #eaeded;
          font-family: "Amazon Ember", Arial, sans-serif;
           margin-top: 60px;
        }

        .container {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0;
        }

        .page-header {
          background: #232f3e;
          color: white;
          padding: 14px 0;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 18px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-btn {
          background: transparent;
          border: 1px solid #565959;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          color: white;
          font-size: 13px;
          transition: all 0.15s ease;
        }

        .back-btn:hover {
          background: #485769;
          border-color: #adb1b8;
        }

        .page-title {
          font-size: 28px;
          font-weight: 400;
          color: white;
          margin: 0;
        }

        .breadcrumb {
          background: white;
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }

        .breadcrumb-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 18px;
          font-size: 12px;
          color: #007185;
        }

        .breadcrumb a {
          color: #007185;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          color: #c7511f;
          text-decoration: underline;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 18px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 20px;
          margin-top: 16px;
        }

        .sidebar {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          height: fit-content;
        }

        .filter-section {
          margin-bottom: 20px;
        }

        .filter-title {
          font-size: 14px;
          font-weight: 700;
          color: #0f1111;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
        }

        .search-box {
          position: relative;
          margin-bottom: 16px;
        }

        .search-input {
          width: 100%;
          padding: 7px 10px 7px 30px;
          border: 1px solid #888c8c;
          border-radius: 4px;
          font-size: 13px;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #e77600;
          box-shadow: 0 0 3px 2px rgba(228, 121, 17, .5);
        }

        .search-icon {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: #565959;
          font-size: 14px;
        }

        .filter-group {
          margin-bottom: 16px;
        }

        .filter-item {
          display: flex;
          align-items: center;
          padding: 4px 0;
          cursor: pointer;
          font-size: 13px;
        }

        .filter-item input {
          margin-right: 8px;
        }

        .filter-item:hover {
          color: #007185;
        }

        .orders-content {
          background: transparent;
        }

        .results-header {
          background: white;
          padding: 14px 18px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .results-count {
          font-size: 16px;
          color: #0f1111;
          font-weight: 400;
        }

        .sort-dropdown {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .sort-select {
          padding: 4px 8px;
          border: 1px solid #888c8c;
          border-radius: 4px;
          background: white;
          font-size: 13px;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .order-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .order-card:hover {
          box-shadow: 0 2px 8px rgba(15, 17, 17, .15);
        }

        .order-header {
          background: #f0f2f2;
          padding: 14px 18px;
          border-bottom: 1px solid #ddd;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 16px;
          font-size: 12px;
        }

        .order-header-item {
          display: flex;
          flex-direction: column;
        }

        .order-header-label {
          color: #565959;
          font-weight: 400;
          margin-bottom: 4px;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.5px;
        }

        .order-header-value {
          color: #0f1111;
          font-weight: 400;
          font-size: 13px;
        }

        .order-id-value {
          color: #007185;
          text-decoration: none;
          cursor: pointer;
          font-weight: 400;
        }

        .order-id-value:hover {
          color: #c7511f;
          text-decoration: underline;
        }

        .order-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 400;
          font-size: 13px;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .tracking-id {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #007185;
          font-weight: 500;
          margin-top: 4px;
        }

        .order-body {
          padding: 18px;
        }

        .order-delivery-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding: 12px;
          background: #f7ca00;
          border-radius: 4px;
          font-size: 14px;
          color: #0f1111;
          font-weight: 500;
        }

        .order-delivery-info.delivered {
          background: #067d62;
          color: white;
        }

        .order-delivery-info.shipped {
          background: #146eb4;
          color: white;
        }

        .order-delivery-info.processing {
          background: #f7ca00;
          color: #0f1111;
        }

        .order-items {
          margin-bottom: 20px;
        }

        .order-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #e7e7e7;
        }

        .order-item:first-child {
          padding-top: 0;
        }

        .order-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .item-image {
          width: 64px;
          height: 64px;
          background: #f7f8f8;
          border: 1px solid #e7e7e7;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #565959;
          font-size: 10px;
          text-align: center;
          padding: 4px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          flex: 1;
          min-width: 0;
        }

        .item-name {
          font-size: 14px;
          color: #007185;
          font-weight: 400;
          margin-bottom: 6px;
          line-height: 1.3;
          cursor: pointer;
        }

        .item-name:hover {
          color: #c7511f;
          text-decoration: underline;
        }

        .item-meta {
          font-size: 12px;
          color: #565959;
          margin-bottom: 4px;
        }

        .item-price {
          font-size: 14px;
          color: #b12704;
          font-weight: 400;
        }

        .order-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-top: 1px solid #e7e7e7;
          margin-top: 20px;
        }

        .summary-left {
          display: flex;
          gap: 24px;
          font-size: 13px;
          color: #565959;
        }

        .summary-right {
          text-align: right;
        }

        .order-total {
          font-size: 18px;
          color: #b12704;
          font-weight: 400;
          margin-bottom: 4px;
        }

        .total-label {
          font-size: 13px;
          color: #565959;
        }

        .order-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e7e7e7;
        }

        .action-btn {
          padding: 8px 16px;
          border: 1px solid #d5d9dd;
          border-radius: 8px;
          background: white;
          color: #0f1111;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 400;
        }

        .action-btn:hover {
          background: #f7f8f8;
          border-color: #adb1b8;
        }

        .btn-primary {
          background: #ff9900;
          border-color: #e47911;
          color: #0f1111;
          font-weight: 400;
        }

        .btn-primary:hover {
          background: #e47911;
          border-color: #e47911;
        }

        .btn-secondary {
          background: white;
          border-color: #d5d9dd;
          color: #0f1111;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid #007185;
          color: #007185;
        }

        .btn-outline:hover {
          background: #007185;
          color: white;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: #f0f2f2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }

        .empty-title {
          font-size: 21px;
          font-weight: 400;
          color: #0f1111;
          margin-bottom: 8px;
        }

        .empty-message {
          color: #565959;
          margin-bottom: 24px;
          font-size: 14px;
          line-height: 1.4;
        }

        .amazon-button {
          background: #ff9900;
          border: 1px solid #e47911;
          border-radius: 8px;
          padding: 8px 16px;
          color: #0f1111;
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .amazon-button:hover {
          background: #e47911;
          border-color: #e47911;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(15, 17, 17, 0.6);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(15, 17, 17, .15);
          border: 1px solid #ddd;
        }

        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f0f2f2;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 400;
          color: #0f1111;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: #565959;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: #0f1111;
          background: #e7e7e7;
          border-radius: 50%;
        }

        .modal-body {
          padding: 20px;
          max-height: 70vh;
          overflow-y: auto;
          background: white;
        }

        .order-info-section {
          margin-bottom: 20px;
          padding: 16px;
          background: #f0f2f2;
          border-radius: 4px;
          border: 1px solid #ddd;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-item label {
          font-size: 12px;
          color: #565959;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-item span {
          font-size: 14px;
          color: #0f1111;
        }

        .tracking-number {
          color: #007185 !important;
          font-family: monospace;
        }

        .ordered-items-section {
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #0f1111;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e7e7e7;
        }

        .items-list {
          margin-bottom: 20px;
        }

        .modal-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .modal-item:last-child {
          border-bottom: none;
        }

        .modal-item-image {
          width: 60px;
          height: 60px;
          background: #f7f8f8;
          border: 1px solid #e7e7e7;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-item-details {
          flex: 1;
          min-width: 0;
        }

        .modal-item-name {
          font-size: 14px;
          color: #0f1111;
          font-weight: 500;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .modal-item-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 13px;
          color: #565959;
        }

        .modal-item-price {
          font-size: 16px;
          color: #b12704;
          font-weight: 500;
          text-align: right;
          align-self: flex-start;
        }

        .modal-total {
          background: #f8fafc;
          padding: 16px;
          border-radius: 6px;
          border: 1px solid #e7e7e7;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .total-row:last-child {
          margin-bottom: 0;
        }

        .order-total-row {
          font-size: 16px;
          font-weight: 600;
          color: #0f1111;
          padding-top: 8px;
          border-top: 1px solid #d5d9dd;
        }

        .order-total-row span:last-child {
          color: #b12704;
        }

        .modal-footer {
          padding: 16px 20px;
          border-top: 1px solid #ddd;
          background: #f0f2f2;
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .more-items {
          padding: 12px 0;
          color: #007185;
          font-size: 14px;
          cursor: pointer;
        }

        .more-items:hover {
          color: #c7511f;
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 0 12px;
          }

          .sidebar {
            order: 2;
            margin-bottom: 0;
            margin-top: 16px;
          }

          .orders-content {
            order: 1;
          }

          .order-header {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 16px;
          }

          .page-title {
            font-size: 24px;
          }

          .order-header {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .order-actions {
            flex-wrap: wrap;
          }

          .action-btn {
            flex: 1;
            min-width: 120px;
            justify-content: center;
          }

          .order-item {
            flex-direction: column;
            gap: 12px;
          }

          .summary-left {
            flex-direction: column;
            gap: 8px;
          }

          .modal-overlay {
            padding: 10px;
          }

          .modal-content {
            max-height: 95vh;
          }

          .modal-body {
            padding: 16px;
            max-height: 75vh;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .order-header {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            font-size: 11px;
          }

          .modal-item {
            gap: 12px;
          }

          .modal-item-image {
            width: 50px;
            height: 50px;
          }

          .modal-footer {
            flex-direction: column;
          }

          .modal-footer .action-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <button 
              className="back-btn"
              onClick={() => onNavigate('home')}
              title="Back to Home"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <h1 className="page-title">Your Orders</h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <div className="breadcrumb-content">
            <a href="#" onClick={() => onNavigate('home')}>Your Account</a>
            <span> › </span>
            <span>Your Orders</span>
          </div>
        </div>

        <div className="main-content">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="filter-section">
              <div className="filter-title">Search Orders</div>
              <div className="search-box">
                <Search size={14} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search all orders"
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-title">Order Status</div>
              <div className="filter-group">
                <div className="filter-item">
                  <input 
                    type="radio" 
                    name="status" 
                    value="all" 
                    checked={statusFilter === 'all'}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  All Orders
                </div>
                <div className="filter-item">
                  <input 
                    type="radio" 
                    name="status" 
                    value="processing" 
                    checked={statusFilter === 'processing'}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  Processing
                </div>
                <div className="filter-item">
                  <input 
                    type="radio" 
                    name="status" 
                    value="shipped" 
                    checked={statusFilter === 'shipped'}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  Shipped
                </div>
                <div className="filter-item">
                  <input 
                    type="radio" 
                    name="status" 
                    value="delivered" 
                    checked={statusFilter === 'delivered'}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  Delivered
                </div>
                <div className="filter-item">
                  <input 
                    type="radio" 
                    name="status" 
                    value="cancelled" 
                    checked={statusFilter === 'cancelled'}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  Cancelled
                </div>
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-title">Order Time</div>
              <div className="filter-group">
                <div className="filter-item">
                  <input 
                    type="radio" 
                    name="time" 
                    value="all" 
                    checked={dateFilter === 'all'}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                  All Orders
                </div>
                <div className="filter-item">
                  <input 
                    type="radio" 
                    name="time" 
                    value="last30" 
                    checked={dateFilter === 'last30'}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                  Past 30 days
                </div>
                <div className="filter-item">
                  <input 
                    type="radio" 
                    name="time" 
                    value="last90" 
                    checked={dateFilter === 'last90'}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                  Past 3 months
                </div>
              </div>
            </div>
          </div>

          {/* Orders Content */}
          <div className="orders-content">
            {/* Results Header */}
            <div className="results-header">
              <div className="results-count">
                {filteredOrders.length} orders placed
              </div>
              <div className="sort-dropdown">
                Sort by:
                <select className="sort-select">
                  <option>Order Date</option>
                  <option>Order Total</option>
                  <option>Order Status</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length > 0 ? (
              <div className="orders-list">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-header-item">
                        <div className="order-header-label">ORDER PLACED</div>
                        <div className="order-header-value">{formatDate(order.date)}</div>
                      </div>
                      <div className="order-header-item">
                        <div className="order-header-label">TOTAL</div>
                        <div className="order-header-value">₹{order.total.toFixed(2)}</div>
                      </div>
                      <div className="order-header-item">
                        <div className="order-header-label">SHIP TO</div>
                        <div className="order-header-value">{order.shippingAddress.split(',')[0]}</div>
                      </div>
                      <div className="order-header-item">
                        <div className="order-header-label">ORDER #{order.id}</div>
                        <div className="order-header-value">
                          <a href="#" className="order-id-value">View order details</a>
                          {order.trackingNumber && (
                            <div style={{fontSize: '11px', color: '#565959', marginTop: '2px'}}>
                              Track: {order.trackingNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="order-body">
                      {/* Delivery Status */}
                      <div className={`order-delivery-info ${order.status}`}>
                        {order.status === 'delivered' && (
                          <>
                            <CheckCircle size={18} />
                            Delivered {formatDate(order.date)}
                          </>
                        )}
                        {order.status === 'shipped' && (
                          <>
                            <Truck size={18} />
                            Shipped - Arriving {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : 'soon'}
                          </>
                        )}
                        {order.status === 'processing' && (
                          <>
                            <Clock size={18} />
                            Preparing for shipment
                          </>
                        )}
                        {order.status === 'cancelled' && (
                          <>
                            <Package size={18} />
                            Order cancelled
                          </>
                        )}
                      </div>

                      {/* Order Items */}
                      <div className="order-items">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="order-item">
                            <div className="item-image">
                              <Package size={20} color="#565959" />
                            </div>
                            <div className="item-details">
                              <div className="item-name">{item.name}</div>
                              <div className="item-meta">
                                Qty: {item.quantity} | ₹{item.price.toFixed(2)} each
                              </div>
                            </div>
                            <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="more-items">
                            +{order.items.length - 3} more items
                          </div>
                        )}
                      </div>

                      {/* Order Actions */}
                      <div className="order-actions">
                        {order.trackingNumber && (order.status === 'shipped' || order.status === 'delivered') && (
                          <button 
                            className="action-btn btn-primary"
                            onClick={() => handleTrackOrder(order.trackingNumber)}
                          >
                            <Truck size={16} />
                            Track package
                          </button>
                        )}
                        <button 
                          className="action-btn btn-secondary"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetails(true);
                          }}
                        >
                          <Eye size={16} />
                          View order details
                        </button>
                        <button className="action-btn btn-outline">
                          <Download size={16} />
                          Invoice
                        </button>
                        {order.status === 'delivered' && (
                          <button className="action-btn btn-outline">
                            <RotateCcw size={16} />
                            Buy it again
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button className="action-btn btn-outline">
                            <Star size={16} />
                            Write a review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <Package size={40} color="#565959" />
                </div>
                <h3 className="empty-title">No orders to display</h3>
                <p className="empty-message">
                  {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' 
                    ? "We couldn't find any orders matching your search. Try different filters or search terms."
                    : "Looks like you haven't placed any orders yet."
                  }
                </p>
                <button 
                  className="amazon-button"
                  onClick={() => onNavigate('products')}
                >
                  <Package size={16} />
                  Start shopping
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Amazon-style Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="modal-overlay" onClick={() => setShowOrderDetails(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Order Details</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowOrderDetails(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="order-info-section">
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Order placed</label>
                      <span>{formatDate(selectedOrder.date)}</span>
                    </div>
                    <div className="info-item">
                      <label>Order #</label>
                      <span className="tracking-number">{selectedOrder.id}</span>
                    </div>
                    <div className="info-item">
                      <label>Order total</label>
                      <span>₹{selectedOrder.total.toFixed(2)}</span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="info-item">
                        <label>Tracking ID</label>
                        <span className="tracking-number">{selectedOrder.trackingNumber}</span>
                      </div>
                    )}
                    <div className="info-item">
                      <label>Payment method</label>
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="info-item">
                      <label>Shipping address</label>
                      <span>{selectedOrder.shippingAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="ordered-items-section">
                  <h3 className="section-title">Items in this order</h3>
                  <div className="items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="modal-item">
                        <div className="modal-item-image">
                          <Package size={24} color="#565959" />
                        </div>
                        <div className="modal-item-details">
                          <div className="modal-item-name">{item.name}</div>
                          <div className="modal-item-meta">
                            <span>Qty: {item.quantity}</span>
                            <span>₹{item.price.toFixed(2)} each</span>
                          </div>
                          <div style={{marginTop: '8px', fontSize: '13px'}}>
                            <button className="btn-outline" style={{padding: '4px 8px', fontSize: '12px'}}>
                              Buy it again
                            </button>
                            {selectedOrder.status === 'delivered' && (
                              <button className="btn-outline" style={{padding: '4px 8px', fontSize: '12px', marginLeft: '8px'}}>
                                Write a product review
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="modal-item-price">₹{(item.price * item.quantity)?.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="modal-total">
                    <div className="total-row">
                      <span>Items ({selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                      <span>₹{(selectedOrder.total - 49).toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                      <span>Shipping & handling:</span>
                      <span>₹49.00</span>
                    </div>
                    <div className="total-row order-total-row">
                      <span>Grand Total:</span>
                      <span>₹{selectedOrder.total?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {selectedOrder.trackingNumber && (selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered') && (
                  <button 
                    className="action-btn btn-primary"
                    onClick={() => {
                      setShowOrderDetails(false);
                      handleTrackOrder(selectedOrder.trackingNumber);
                    }}
                  >
                    <Truck size={16} />
                    Track package
                  </button>
                )}
                <button 
                  className="action-btn btn-secondary"
                  onClick={() => setShowOrderDetails(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;