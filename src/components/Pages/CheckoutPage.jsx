// src/components/Pages/CheckoutPage.jsx
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { ArrowLeft, CreditCard, Truck, Shield, MapPin } from "lucide-react";
import { updateCustomerAddress } from "../../api/api";

const normalizeAddressArray = (res) => {
  const data = res?.data;
  if (!data) return [];
  const maybe = data.data ?? data;
  if (Array.isArray(maybe)) return maybe;
  if (Array.isArray(maybe.$values)) return maybe.$values;
  return [];
};

const CheckoutPage = ({ cartItems = [], onNavigate, getCartTotal, onOrderPlaced }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  // addresses & form
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({ addressLine: "", city: "", state: "", zipCode: "" });

  const handleZipChange = async (e) => {
    const value = e.target.value;
    setAddressForm(p => ({ ...p, zipCode: value }));

    if (/^\d{5,6}$/.test(value)) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();
        if (data[0]?.Status === "Success" && data[0].PostOffice?.length > 0) {
          const postOffice = data[0].PostOffice[0];
          setAddressForm(p => ({
            ...p,
            city: postOffice.District,
            state: postOffice.State,
          }));
          setErrors(p => ({ ...p, zipCode: "" }));
        } else {
          setAddressForm(p => ({ ...p, city: "", state: "" }));
          setErrors(p => ({ ...p, zipCode: "Invalid PIN code" }));
        }
      } catch (err) {
        setAddressForm(p => ({ ...p, city: "", state: "" }));
        setErrors(p => ({ ...p, zipCode: "Error fetching data" }));
      }
    } else {
      setAddressForm(p => ({ ...p, city: "", state: "" }));
      setErrors(p => ({ ...p, zipCode: "" }));
    }
  };

  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // payment & other fields
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    shippingMethod: "standard",
    paymentMethod: "card",
  });

  const [errors, setErrors] = useState({});
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [message, setMessage] = useState(null);

  // UI toggles for add/edit/delete
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const fetchedRef = useRef(false); // prevents double fetch in StrictMode

  // totals
  const subtotal = typeof getCartTotal === "function" ? getCartTotal() : cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = formData.shippingMethod === "express" ? 99 : 49;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  // -------------------- network helpers --------------------

  // fetchAddresses needs to be defined BEFORE useEffect
  const fetchAddresses = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axiosInstance.get("/CustomerAddresses");
      const list = normalizeAddressArray(res);
      setAddresses(list);
      if (list.length > 0) setSelectedAddressId(Number(list[0].id));
    } catch (err) {
      setMessage({ type: "error", text: err?.response?.data?.message || err.message || "Error loading addresses" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // avoid double fetch in dev StrictMode:
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add address (returns created address)
  const addAddressAsync = async (addr) => {
    setIsAddingAddress(true);
    setMessage(null);
    try {
      const payload = {
        AddressLine: addr.addressLine,
        City: addr.city,
        State: addr.state,
        ZipCode: addr.zipCode,
      };
      const res = await axiosInstance.post("/CustomerAddresses", payload);
      // created object expected at res.data.data
      const created = res?.data?.data ?? res?.data;
      if (Array.isArray(created)) return created[0];
      return created;
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err.message || "Error adding address";
      setMessage({ type: "error", text: serverMsg });
      throw err;
    } finally {
      setIsAddingAddress(false);
    }
  };

  // Delete address
  const deleteAddressAsync = async (addressId) => {
    try {
      const res = await axiosInstance.delete(`/CustomerAddresses/${addressId}`);
      if (res.data?.success) return true;
      throw new Error(res.data?.message || "Failed to delete address");
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err.message || "Error deleting address";
      setMessage({ type: "error", text: serverMsg });
      throw err;
    }
  };

  // Place order (uses backend's CreateOrderDto: CustomerAddressId + PaymentMethod)
  const placeOrderAsync = async (orderPayload) => {
    setIsPlacingOrder(true);
    setMessage(null);
    try {
      const payload = {
        CustomerAddressId: orderPayload.CustomerAddressId,
        PaymentMethod: orderPayload.PaymentMethod,
      };
      const res = await axiosInstance.post("/Orders", payload);
      if (res.data?.success) {
        setMessage({ type: "success", text: "Order placed successfully." });
        return res.data;
      } else {
        throw new Error(res.data?.message || "Failed to place order");
      }
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err.message || "Error placing order";
      setMessage({ type: "error", text: serverMsg });
      throw err;
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // -------------------- UI helpers & validation --------------------

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(" ").trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((p) => ({ ...p, cardNumber: formatted }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    // If there are no saved addresses, require addressForm
    if (addresses.length === 0 || showAddForm) {
      if (!addressForm.addressLine.trim()) newErrors.addressLine = "Address Line is required";
      if (!addressForm.city.trim()) newErrors.city = "City is required";
      if (!addressForm.state.trim()) newErrors.state = "State is required";
      if (!/^[0-9]{5,6}$/.test(addressForm.zipCode)) newErrors.zipCode = "Please enter a valid 5 or 6-digit pincode";
    } else {
      if (!selectedAddressId) newErrors.selectedAddress = "Please select an address";
    }

    // Payment validation (client-side only)
    if (formData.paymentMethod === "card") {
      const rawCard = (formData.cardNumber || "").replace(/\s/g, "");
      if (!rawCard) newErrors.cardNumber = "Card number is required";
      else if (rawCard.length !== 16) newErrors.cardNumber = "Please enter a valid 16-digit card number";
      if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
      else if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 digits";
      if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add address (UI click)
  const handleAddAddress = async () => {
    // client validation
    const addrErr = {};
    if (!addressForm.addressLine.trim()) addrErr.addressLine = "Address Line is required";
    if (!addressForm.city.trim()) addrErr.city = "City is required";
    if (!addressForm.state.trim()) addrErr.state = "State is required";
    if (!/^[0-9]{5,6}$/.test(addressForm.zipCode)) addrErr.zipCode = "Please enter a valid 5 or 6-digit pincode";

    if (Object.keys(addrErr).length) {
      setErrors((p) => ({ ...p, ...addrErr }));
      return;
    }

    try {
      const newAddr = await addAddressAsync(addressForm);
      setAddresses((prev) => [newAddr, ...prev]);
      setSelectedAddressId(Number(newAddr.id));
      setAddressForm({ addressLine: "", city: "", state: "", zipCode: "" });
      setShowAddForm(false);
      setMessage({ type: "success", text: "Address added." });
    } catch (err) {
      // error already shown by addAddressAsync
    }
  };

  const handleUpdateAddress = async () => {
    try {
      setIsAddingAddress(true);
      await updateCustomerAddress(editingAddressId, addressForm);
      alert("Address updated successfully!");
      setIsEditing(false);
      setEditingAddressId(null);
      setShowAddForm(false);
      fetchAddresses();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message === "Sorry, we don't deliver to the new area. Please use a different address.") {
        setMessage({ type: "error", text: err.response.data.message });
      } else {
        console.error("Error updating address", err);
        setMessage({ type: "error", text: "An unexpected error occurred while updating the address." });
      }
    } finally {
      setIsAddingAddress(false);
    }
  };

  // Delete handler
  const handleDeleteAddress = async (addressId) => {
    const ok = window.confirm("Are you sure you want to delete this address?");
    if (!ok) return;

    setDeletingAddressId(Number(addressId));
    try {
      await deleteAddressAsync(addressId);

      // update UI (server marks isActive=false)
      setAddresses((prev) => prev.filter((a) => Number(a.id) !== Number(addressId)));

      // if the deleted address was selected, pick first or null
      if (Number(selectedAddressId) === Number(addressId)) {
        const remaining = addresses.filter((a) => Number(a.id) !== Number(addressId));
        setSelectedAddressId(remaining.length ? Number(remaining[0].id) : null);
      }

      setMessage({ type: "success", text: "Address deleted." });
    } catch (err) {
      // message already set in deleteAddressAsync
    } finally {
      setDeletingAddressId(null);
    }
  };

  // Final submit: ensure address exists (create if needed), then place order
  const handleSubmit = async (e) => {
    try {
      await updateCustomerAddress(selectedAddressId, formData);
      alert("Address updated successfully!");
      // refresh or redirect as needed
    } catch (error) {
      console.error("Error updating address:", error);
    }
    e.preventDefault();
    setMessage(null);

    // if showAddForm true we intend to create address (or user could choose saved)
    if (!validateForm()) return;

    try {
      let shippingAddress = null;
      if (addresses.length > 0 && !showAddForm && selectedAddressId) {
        shippingAddress = addresses.find((a) => Number(a.id) === Number(selectedAddressId));
      } else {
        // create address first
        const newAddr = await addAddressAsync(addressForm);
        setAddresses((prev) => [newAddr, ...prev]);
        setSelectedAddressId(Number(newAddr.id));
        shippingAddress = newAddr;
      }

      if (!shippingAddress) {
        setMessage({ type: "error", text: "Selected shipping address not found." });
        return;
      }

      // Build minimal payload expected by backend (CreateOrderDto)
      const orderPayload = {
        CustomerAddressId: Number(shippingAddress.id),
        PaymentMethod: formData.paymentMethod,
      };

      const result = await placeOrderAsync(orderPayload);
      if (onOrderPlaced) onOrderPlaced(result);
    } catch (err) {
      console.error(err);
    }
  };

  // Helper: prefill add form for "Edit" action (note: API has no update endpoint)
  const handlePrefillForEdit = (addr) => {
    setIsEditing(true);
    setEditingAddressId(addr.id);
    setAddressForm({
      addressLine: addr.addressLine,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
    });
    setShowAddForm(true);
  };


  // -------------------- JSX (kept your styles/layout) --------------------
  return (
    <div className="checkout-page">
      <style jsx>{`
        .checkout-page {
          min-height: 100vh;
          background: white;
        }

        .checkout-container {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0;
        }

        .checkout-header {
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

        .checkout-title {
          font-size: 28px;
          font-weight: 400;
          color: #0f1111;
          margin: 0;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .checkout-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 24px;
          margin-top: 20px;
        }

        .checkout-form {
          background: transparent;
        }

        .form-section {
          background: white;
          border: 1px solid #d5d9dd;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 400;
          color: #0f1111;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e7e7e7;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-group {
          margin-bottom: 12px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #0f1111;
          margin-bottom: 4px;
        }

        .form-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d5d9dd;
          border-radius: 4px;
          font-size: 14px;
          transition: all 0.15s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #e77600;
          box-shadow: 0 0 3px 2px rgba(228, 121, 17, .5);
        }

        .form-input.error {
          border-color: #d00;
          box-shadow: 0 0 3px 2px rgba(221, 0, 0, .5);
        }

        .form-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d5d9dd;
          border-radius: 4px;
          font-size: 14px;
          background: white;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .form-select:focus {
          outline: none;
          border-color: #e77600;
          box-shadow: 0 0 3px 2px rgba(228, 121, 17, .5);
        }

        .error-message {
          color: #d00;
          font-size: 12px;
          margin-top: 4px;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 8px 12px;
          border: 1px solid #d5d9dd;
          border-radius: 4px;
          transition: all 0.15s ease;
        }

        .radio-option:hover {
          border-color: #adb1b8;
          background: #f7f8f8;
        }

        .radio-input {
          width: 14px;
          height: 14px;
          margin: 0;
        }

        .radio-label {
          font-size: 14px;
          color: #0f1111;
          margin: 0;
        }

        .order-summary {
          background: white;
          border: 1px solid #d5d9dd;
          border-radius: 8px;
          padding: 20px;
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .summary-title {
          font-size: 18px;
          font-weight: 400;
          color: #0f1111;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e7e7e7;
        }

        .cart-items {
          margin-bottom: 24px;
        }

        .cart-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .item-image {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 0.7rem;
          font-weight: 600;
          margin-right: 12px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          flex: 1;
        }

        .item-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 2px;
        }

        .item-quantity {
          font-size: 0.8rem;
          color: #6b7280;
        }

        .item-price {
          font-size: 0.9rem;
          font-weight: 700;
          color: #059669;
        }

        .price-breakdown {
          border-top: 2px solid #f3f4f6;
          padding-top: 20px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .price-row:last-child {
          margin-bottom: 0;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-weight: 700;
          font-size: 1.1rem;
          color: #1f2937;
        }

        .price-label {
          color: #6b7280;
          font-size: 0.95rem;
        }

        .price-value {
          font-weight: 600;
          color: #1f2937;
        }

        .submit-btn {
          width: 100%;
          padding: 12px 16px;
          background: #ff9900;
          color: #0f1111;
          border: 1px solid #e47911;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.15s ease;
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover {
          background: #e47911;
          border-color: #e47911;
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .security-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding: 12px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          color: #059669;
          font-size: 0.85rem;
        }

        @media (max-width: 1024px) {
          .checkout-content {
            grid-template-columns: 1fr;
          }

          .order-summary {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .checkout-container {
            padding: 0 16px;
          }

          .checkout-form, .order-summary {
            padding: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .checkout-header {
            padding: 16px 20px;
          }

          .checkout-title {
            font-size: 1.5rem;
          }

          .radio-group {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>

      <div className="checkout-container">
        <div className="checkout-header">
          <div className="header-content">
            <button className="back-btn" onClick={() => onNavigate("products")} title="Back to Products">
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="checkout-title">Checkout</h1>
          </div>
        </div>

        <div className="main-content">
          <form onSubmit={handleSubmit}>
            <div className="checkout-content">
              <div className="checkout-form">
                {/* Shipping Address */}
                <div className="form-section">
                  <h2 className="section-title"><MapPin size={20} /> Shipping Address</h2>

                  {loading ? (
                    <p>Loading addresses...</p>
                  ) : addresses.length > 0 ? (
                    <div>
                      <h3>Select Address</h3>

                      {addresses.map((addr) => (
                        <div key={addr.id} className="radio-option">
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <input
                              type="radio"
                              name="selectedAddress"
                              value={addr.id}
                              checked={Number(selectedAddressId) === Number(addr.id)}
                              onChange={() => setSelectedAddressId(Number(addr.id))}
                              className="radio-input"
                            />
                            <span className="radio-label">{addr.addressLine}, {addr.city}, {addr.state} - {addr.zipCode}</span>
                          </div>

                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              type="button"
                              onClick={() => handlePrefillForEdit(addr)}
                              title="Edit (prefills form; API does not update existing address)"
                              style={{ border: "none", background: "transparent", cursor: "pointer", color: "#0ea025" }}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteAddress(addr.id)}
                              disabled={deletingAddressId === Number(addr.id)}
                              style={{ border: "none", background: "transparent", cursor: "pointer", color: "red" }}
                            >
                              {deletingAddressId === Number(addr.id) ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add New Address toggle */}
                      <div style={{ marginTop: 12 }}>
                        <button
                          type="button"
                          className="submit-btn"
                          onClick={() => {
                            if (showAddForm) {
                              setIsEditing(false);
                              setEditingAddressId(null);
                            }
                            setShowAddForm((s) => !s);
                          }}
                          style={{ width: "auto", padding: "8px 12px" }}
                        >
                          {showAddForm ? "Cancel" : "Add New Address"}
                        </button>
                      </div>

                      {/* Inline add/edit form */}
                      {showAddForm && (
                        <div style={{ marginTop: 12 }}>
                          <div className="form-grid">
                            <div className="form-group full-width">
                              <label className="form-label">Address Line *</label>
                              <input
                                type="text"
                                placeholder="Address Line"
                                value={addressForm.addressLine}
                                onChange={(e) => setAddressForm((p) => ({ ...p, addressLine: e.target.value }))}
                                className={`form-input ${errors.addressLine ? "error" : ""}`}
                              />
                              {errors.addressLine && <div className="error-message">{errors.addressLine}</div>}
                            </div>

                            <div className="form-group">
                              <label className="form-label">City *</label>
                              <input
                                type="text"
                                placeholder="City"
                                value={addressForm.city}
                                onChange={(e) => setAddressForm((p) => ({ ...p, city: e.target.value }))}
                                className={`form-input ${errors.city ? "error" : ""}`}
                              />
                              {errors.city && <div className="error-message">{errors.city}</div>}
                            </div>

                            <div className="form-group">
                              <label className="form-label">State *</label>
                              <input
                                type="text"
                                placeholder="State"
                                value={addressForm.state}
                                onChange={(e) => setAddressForm((p) => ({ ...p, state: e.target.value }))}
                                className={`form-input ${errors.state ? "error" : ""}`}
                                readOnly
                              />
                              {errors.state && <div className="error-message">{errors.state}</div>}
                            </div>

                            <div className="form-group">
                              <label className="form-label">Zip Code *</label>
                              <input
                                type="text"
                                placeholder="Zip Code"
                                value={addressForm.zipCode}
                                onChange={handleZipChange}
                                className={`form-input ${errors.zipCode ? "error" : ""}`}
                              />
                              {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                            </div>

                            <div className="form-group full-width">
                              <button
                                type="button"
                                onClick={isEditing ? handleUpdateAddress : handleAddAddress}
                                className="submit-btn"
                                disabled={isAddingAddress}
                              >
                                {isAddingAddress
                                  ? isEditing
                                    ? "Updating..."
                                    : "Adding..."
                                  : isEditing
                                    ? "Update Address"
                                    : "Save Address"}
                              </button>

                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // No addresses exist — show add form directly
                    <div>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label className="form-label">Address Line *</label>
                          <input
                            type="text"
                            placeholder="Address Line"
                            value={addressForm.addressLine}
                            onChange={(e) => setAddressForm((p) => ({ ...p, addressLine: e.target.value }))}
                            className={`form-input ${errors.addressLine ? "error" : ""}`}
                          />
                          {errors.addressLine && <div className="error-message">{errors.addressLine}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">City *</label>
                          <input
                            type="text"
                            placeholder="City"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm((p) => ({ ...p, city: e.target.value }))}
                            className={`form-input ${errors.city ? "error" : ""}`}
                          />
                          {errors.city && <div className="error-message">{errors.city}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">State *</label>
                          <input
                            type="text"
                            placeholder="State"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm((p) => ({ ...p, state: e.target.value }))}
                            className={`form-input ${errors.state ? "error" : ""}`}
                          />
                          {errors.state && <div className="error-message">{errors.state}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">Zip Code *</label>
                          <input
                            type="text"
                            placeholder="Zip Code"
                            value={addressForm.zipCode}
                            onChange={(e) => setAddressForm((p) => ({ ...p, zipCode: e.target.value }))}
                            className={`form-input ${errors.zipCode ? "error" : ""}`}
                          />
                          {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                        </div>

                        <div className="form-group full-width">
                          <button type="button" onClick={handleAddAddress} className="submit-btn" disabled={isAddingAddress}>
                            {isAddingAddress ? "Adding..." : "Add Address"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping Method */}
                <div className="form-section">
                  <h2 className="section-title"><Truck size={20} /> Shipping Method</h2>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input type="radio" name="shippingMethod" value="standard" checked={formData.shippingMethod === "standard"} onChange={handleInputChange} className="radio-input" />
                      <span className="radio-label">Standard Delivery (5-7 days) - ₹49</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="shippingMethod" value="express" checked={formData.shippingMethod === "express"} onChange={handleInputChange} className="radio-input" />
                      <span className="radio-label">Express Delivery (2-3 days) - ₹99</span>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="form-section">
                  <h2 className="section-title"><CreditCard size={20} /> Payment Method</h2>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === "card"} onChange={handleInputChange} className="radio-input" />
                      <span className="radio-label">Credit/Debit Card</span>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleInputChange} className="radio-input" />
                      <span className="radio-label">Cash on Delivery</span>
                    </label>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="form-grid" style={{ marginTop: "16px" }}>
                      <div className="form-group full-width">
                        <label className="form-label">Card Number *</label>
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleCardNumberChange} className={`form-input ${errors.cardNumber ? "error" : ""}`} placeholder="1234 5678 9012 3456" maxLength="19" />
                        {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Expiry Date *</label>
                        <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className={`form-input ${errors.expiryDate ? "error" : ""}`} placeholder="MM/YY" />
                        {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">CVV *</label>
                        <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} className={`form-input ${errors.cvv ? "error" : ""}`} placeholder="123" maxLength="3" />
                        {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">Cardholder Name *</label>
                        <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} className={`form-input ${errors.cardName ? "error" : ""}`} placeholder="Name as on card" />
                        {errors.cardName && <div className="error-message">{errors.cardName}</div>}
                      </div>
                    </div>
                  )}
                  <div className="security-info"><Shield size={16} /> Your payment information is secure and encrypted</div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="order-summary">
                <h2 className="summary-title">Order Summary</h2>

                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} onError={(e) => { e.target.style.display = "none"; e.target.parentNode.textContent = item.name.substring(0, 6); }} />
                      </div>
                      <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-quantity">Qty: {item.quantity}</div>
                      </div>
                      <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="price-breakdown">
                  <div className="price-row"><span className="price-label">Subtotal:</span><span className="price-value">₹{subtotal.toFixed(2)}</span></div>
                  <div className="price-row"><span className="price-label">Shipping:</span><span className="price-value">₹{shipping.toFixed(2)}</span></div>
                  <div className="price-row"><span className="price-label">Tax (GST 18%):</span><span className="price-value">₹{tax.toFixed(2)}</span></div>
                  <div className="price-row"><span className="price-label">Total:</span><span className="price-value">₹{total.toFixed(2)}</span></div>
                </div>
                {message && <div style={{ marginTop: 12, color: message.type === "error" ? "red" : "green" }}>{message.text}</div>}
                <button type="submit" className="submit-btn" disabled={cartItems.length === 0 || isPlacingOrder || isAddingAddress}>
                  <CreditCard size={20} />
                  {isPlacingOrder ? `Placing order...` : `Place Order - ₹${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
