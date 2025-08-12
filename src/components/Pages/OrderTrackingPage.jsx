// src/components/Pages/OrderTrackingPage.jsx
import React, { useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Calendar, Clock, Phone, Copy, ExternalLink } from 'lucide-react';

const OrderTrackingPage = ({ onNavigate, trackingNumber }) => {
  const [inputTrackingNumber, setInputTrackingNumber] = useState(trackingNumber || '');
  const [isTracking, setIsTracking] = useState(false);

  // Mock tracking data
  const mockTrackingData = {
    'TRK123456789': {
      orderId: 'ORD-001234',
      status: 'delivered',
      estimatedDelivery: '2024-12-10',
      actualDelivery: '2024-12-10',
      carrier: 'Express Logistics',
      currentLocation: 'Delivered',
      trackingSteps: [
        {
          status: 'Order Placed',
          description: 'Your order has been confirmed',
          timestamp: '2024-12-05 10:30 AM',
          location: 'New Delhi',
          completed: true
        },
        {
          status: 'Order Processed',
          description: 'Your order is being prepared',
          timestamp: '2024-12-06 02:15 PM',
          location: 'Warehouse - Gurgaon',
          completed: true
        },
        {
          status: 'Shipped',
          description: 'Your order has been picked up by our delivery partner',
          timestamp: '2024-12-07 09:45 AM',
          location: 'Gurgaon Hub',
          completed: true
        },
        {
          status: 'In Transit',
          description: 'Your package is on the way',
          timestamp: '2024-12-08 06:20 AM',
          location: 'Delhi Hub',
          completed: true
        },
        {
          status: 'Out for Delivery',
          description: 'Your package is out for delivery',
          timestamp: '2024-12-10 08:00 AM',
          location: 'New Delhi Local Office',
          completed: true
        },
        {
          status: 'Delivered',
          description: 'Package delivered successfully',
          timestamp: '2024-12-10 02:30 PM',
          location: 'New Delhi - 110001',
          completed: true
        }
      ],
      packageInfo: {
        weight: '2.5 kg',
        dimensions: '25 x 15 x 10 cm',
        items: 3
      },
      deliveryAddress: {
        name: 'John Doe',
        address: '123, Green Park, New Delhi - 110016',
        phone: '+91 98765 43210'
      }
    },
    'TRK123456790': {
      orderId: 'ORD-001235',
      status: 'in_transit',
      estimatedDelivery: '2024-12-12',
      carrier: 'Blue Dart Express',
      currentLocation: 'Mumbai Hub',
      trackingSteps: [
        {
          status: 'Order Placed',
          description: 'Your order has been confirmed',
          timestamp: '2024-12-08 11:00 AM',
          location: 'Mumbai',
          completed: true
        },
        {
          status: 'Order Processed',
          description: 'Your order is being prepared',
          timestamp: '2024-12-08 04:30 PM',
          location: 'Warehouse - Pune',
          completed: true
        },
        {
          status: 'Shipped',
          description: 'Your order has been picked up by our delivery partner',
          timestamp: '2024-12-09 10:15 AM',
          location: 'Pune Hub',
          completed: true
        },
        {
          status: 'In Transit',
          description: 'Your package is on the way',
          timestamp: '2024-12-10 07:30 AM',
          location: 'Mumbai Hub',
          completed: true,
          current: true
        },
        {
          status: 'Out for Delivery',
          description: 'Your package will be out for delivery',
          timestamp: 'Expected: 2024-12-12 09:00 AM',
          location: 'Mumbai Local Office',
          completed: false
        },
        {
          status: 'Delivered',
          description: 'Package will be delivered',
          timestamp: 'Expected: 2024-12-12',
          location: 'Mumbai - 400001',
          completed: false
        }
      ],
      packageInfo: {
        weight: '5.2 kg',
        dimensions: '35 x 25 x 15 cm',
        items: 1
      },
      deliveryAddress: {
        name: 'Jane Smith',
        address: '456, Bandra West, Mumbai - 400050',
        phone: '+91 87654 32109'
      }
    }
  };

  const currentTracking = mockTrackingData[inputTrackingNumber];

  const handleTrack = () => {
    setIsTracking(true);
    // Simulate API call
    setTimeout(() => {
      setIsTracking(false);
    }, 1000);
  };

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(inputTrackingNumber);
    // You could add a toast notification here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#10b981';
      case 'in_transit': return '#3b82f6';
      case 'shipped': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="order-tracking-page">
      <style jsx>{`
        .order-tracking-page {
          min-height: 100vh;
          background: #fafafa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
        }

        .page-header {
          background: white;
          border-bottom: 1px solid #e7e7e7;
          padding: 24px 0;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-btn {
          background: transparent;
          border: 1px solid #d5d9dd;
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #0f1111;
          font-size: 13px;
          transition: all 0.15s ease;
        }

        .back-btn:hover {
          background: #f7f8f8;
          border-color: #adb1b8;
        }

        .page-title {
          font-size: 28px;
          font-weight: 400;
          color: #0f1111;
          margin: 0;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .tracking-input-section {
          background: white;
          border: 1px solid #d5d9dd;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .input-section-title {
          font-size: 18px;
          font-weight: 400;
          color: #0f1111;
          margin-bottom: 16px;
        }

        .input-group {
          display: flex;
          gap: 12px;
          align-items: end;
        }

        .input-container {
          flex: 1;
        }

        .input-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #0f1111;
          margin-bottom: 6px;
        }

        .tracking-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d5d9dd;
          border-radius: 4px;
          font-size: 14px;
          transition: all 0.15s ease;
        }

        .tracking-input:focus {
          outline: none;
          border-color: #e77600;
          box-shadow: 0 0 3px 2px rgba(228, 121, 17, .5);
        }

        .track-btn {
          padding: 8px 16px;
          background: #ff9900;
          color: #0f1111;
          border: 1px solid #e47911;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 100px;
          justify-content: center;
        }

        .track-btn:hover {
          background: #e47911;
          border-color: #e47911;
        }

        .track-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .tracking-result {
          background: white;
          border: 1px solid #d5d9dd;
          border-radius: 8px;
          overflow: hidden;
        }

        .tracking-header {
          padding: 20px;
          background: #f7f8f8;
          border-bottom: 1px solid #e7e7e7;
        }

        .tracking-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .order-id {
          font-size: 21px;
          font-weight: 400;
          color: #0f1111;
        }

        .copy-btn {
          background: transparent;
          border: 1px solid #d5d9dd;
          border-radius: 4px;
          padding: 4px 8px;
          color: #0f1111;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          transition: all 0.15s ease;
        }

        .copy-btn:hover {
          background: #f7f8f8;
          border-color: #adb1b8;
        }

        .tracking-number {
          font-size: 14px;
          font-weight: 400;
          color: #565959;
          margin-bottom: 8px;
        }

        .current-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #007600;
          font-weight: 400;
        }

        .tracking-content {
          padding: 20px;
        }

        .status-overview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 24px;
          padding: 16px;
          background: #f7f8f8;
          border-radius: 4px;
        }

        .status-item {
          text-align: center;
        }

        .status-label {
          color: #565959;
          font-size: 11px;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 400;
        }

        .status-value {
          font-weight: 400;
          color: #0f1111;
          font-size: 14px;
        }

        .tracking-timeline {
          position: relative;
        }

        .timeline-title {
          font-size: 18px;
          font-weight: 400;
          color: #0f1111;
          margin-bottom: 20px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e7e7e7;
        }

        .timeline-step {
          position: relative;
          padding: 16px 0 16px 50px;
          border-left: 2px solid #e7e7e7;
        }

        .timeline-step:last-child {
          border-left: 2px solid transparent;
        }

        .timeline-step.completed {
          border-left-color: #12b431;
        }

        .timeline-step.current {
          border-left-color: #e47911;
        }

        .timeline-icon {
          position: absolute;
          left: -10px;
          top: 20px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          border: 2px solid white;
        }

        .timeline-icon.completed {
          background: #12b431;
          color: white;
        }

        .timeline-icon.current {
          background: #e47911;
          color: white;
        }

        .timeline-icon.pending {
          background: #ddd;
          color: #999;
        }

        .timeline-content {
          margin-left: 8px;
        }

        .step-status {
          font-weight: 400;
          color: #0f1111;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .step-description {
          color: #565959;
          margin-bottom: 8px;
          font-size: 13px;
        }

        .step-details {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #565959;
        }

        .step-time {
          color: #565959;
          font-weight: 400;
        }

        .step-location {
          color: #565959;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .delivery-info {
          margin-top: 40px;
          padding: 24px;
          background: #f8fafc;
          border-radius: 12px;
        }

        .delivery-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .delivery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .delivery-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #374151;
        }

        .no-tracking {
          text-align: center;
          padding: 60px 30px;
          color: #6b7280;
        }

        .no-tracking-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .no-tracking-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .no-tracking-message {
          margin-bottom: 24px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }

          .page-header, .tracking-input-section, .tracking-content {
            padding: 20px;
          }

          .input-group {
            flex-direction: column;
            align-items: stretch;
          }

          .track-btn {
            width: 100%;
          }

          .status-overview {
            grid-template-columns: 1fr;
          }

          .delivery-grid {
            grid-template-columns: 1fr;
          }

          .step-details {
            flex-direction: column;
            gap: 4px;
          }

          .page-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <button 
              className="back-btn"
              onClick={() => onNavigate('order-history')}
              title="Back to Order History"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <h1 className="page-title">Track Package</h1>
          </div>
        </div>

        <div className="main-content">
          {/* Tracking Input */}
          <div className="tracking-input-section">
            <h2 className="input-section-title">Track your package</h2>
            <div className="input-group">
              <div className="input-container">
                <label className="input-label">TRACKING ID</label>
                <input
                  type="text"
                  className="tracking-input"
                  value={inputTrackingNumber}
                  onChange={(e) => setInputTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                />
              </div>
              <button 
                className="track-btn"
                onClick={handleTrack}
                disabled={!inputTrackingNumber || isTracking}
              >
                {isTracking ? (
                  <>
                    <Clock size={14} />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Package size={14} />
                    Track package
                  </>
                )}
              </button>
            </div>
          </div>

        {/* Tracking Results */}
        {currentTracking ? (
          <div className="tracking-result">
            <div className="tracking-header">
              <div className="tracking-title">
                <span className="order-id">Order #{currentTracking.orderId}</span>
                <button className="copy-btn" onClick={copyTrackingNumber}>
                  <Copy size={14} />
                  Copy
                </button>
              </div>
              <div className="tracking-number">Tracking: {inputTrackingNumber}</div>
              <div className="current-status">
                <Truck size={18} />
                Current Status: {currentTracking.currentLocation}
              </div>
            </div>

            <div className="tracking-content">
              {/* Status Overview */}
              <div className="status-overview">
                <div className="status-item">
                  <div className="status-label">Carrier</div>
                  <div className="status-value">{currentTracking.carrier}</div>
                </div>
                <div className="status-item">
                  <div className="status-label">Package Info</div>
                  <div className="status-value">{currentTracking.packageInfo.items} items</div>
                </div>
                <div className="status-item">
                  <div className="status-label">Estimated Delivery</div>
                  <div className="status-value">
                    {new Date(currentTracking.estimatedDelivery).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="tracking-timeline">
                <h3 className="timeline-title">
                  <Clock size={20} />
                  Tracking Timeline
                </h3>

                {currentTracking.trackingSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`timeline-step ${step.completed ? 'completed' : 'pending'} ${step.current ? 'current' : ''}`}
                  >
                    <div className={`timeline-icon ${step.completed ? 'completed' : step.current ? 'current' : 'pending'}`}>
                      {step.completed ? <CheckCircle size={12} /> : index + 1}
                    </div>
                    <div className="timeline-content">
                      <div className="step-status">{step.status}</div>
                      <div className="step-description">{step.description}</div>
                      <div className="step-details">
                        <div className="step-time">{step.timestamp}</div>
                        <div className="step-location">
                          <MapPin size={12} />
                          {step.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Information */}
              <div className="delivery-info">
                <h3 className="delivery-title">Delivery Information</h3>
                <div className="delivery-grid">
                  <div className="delivery-item">
                    <Package size={16} />
                    <span>Weight: {currentTracking.packageInfo.weight}</span>
                  </div>
                  <div className="delivery-item">
                    <MapPin size={16} />
                    <span>{currentTracking.deliveryAddress.address}</span>
                  </div>
                  <div className="delivery-item">
                    <Phone size={16} />
                    <span>{currentTracking.deliveryAddress.phone}</span>
                  </div>
                  <div className="delivery-item">
                    <ExternalLink size={16} />
                    <span>Dimensions: {currentTracking.packageInfo.dimensions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : inputTrackingNumber && !isTracking ? (
          <div className="tracking-result">
            <div className="no-tracking">
              <div className="no-tracking-icon">📦</div>
              <h3 className="no-tracking-title">No Tracking Information Found</h3>
              <p className="no-tracking-message">
                We couldn't find any tracking information for "{inputTrackingNumber}". 
                Please check the tracking number and try again.
              </p>
              <button 
                className="track-btn"
                onClick={() => setInputTrackingNumber('')}
              >
                Try Another Number
              </button>
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;