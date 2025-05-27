import React, { useEffect, useState } from "react";
import "./PaymentPage.css";

const shippingRates = {
  "": 0, // default no selection
  "Nairobi CBD": 100,
  "Public Means": 300,
  "ZONE 1": 300,
  "ZONE 2": 300,
  "ZONE 3": 300,
  "ZONE 4": 700,
  "ZONE 5": 500,
  "ZONE 6": 800,
  "ZONE 7": 500,
  "ZONE 8": 400,
  "ZONE 9": 600,
  "ZONE 10": 400,
  "ZONE 11": 500,
};

export default function PaymentPage() {
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    region: "",
    billingAddressSame: true,
  });

  useEffect(() => {
    const loadOrder = () => {
      const storedOrder = localStorage.getItem("latestOrder");
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setOrder(parsedOrder);
        setFormData((prev) => ({
          ...prev,
          phone: parsedOrder.phone || "",
          address: parsedOrder.location || "",
          region: parsedOrder.region || "",
        }));
      }
    };

    loadOrder();
    window.addEventListener("orderUpdated", loadOrder);
    return () => {
      window.removeEventListener("orderUpdated", loadOrder);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!order) {
    return (
      <div className="payment-page">
        <h2>No order found</h2>
      </div>
    );
  }

  const shippingFee = shippingRates[formData.region] ?? 0;
  const subtotal = order.subtotal;
  const total = subtotal + shippingFee;

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* LEFT SIDE */}
        <div className="payment-left">
          <h2 className="payment-title">Contact Information</h2>

          <div className="form-section">
            <label>Email or mobile phone number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your email or phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <label>Country/Region</label>
            <input type="text" defaultValue="Kenya" disabled />
          </div>

          <h2 className="payment-title" style={{ marginTop: "2rem" }}>
            Shipping Address
          </h2>

          <div className="form-row">
            <div className="form-section half">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-section half">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Street address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <label>Apartment, suite, etc. (optional)</label>
            <input
              type="text"
              name="apartment"
              placeholder="Apartment, suite, etc."
              value={formData.apartment}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-section half">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-section half">
              <label>Postal code</label>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal code"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Shipping Region Select */}
          <div className="form-section" style={{ marginTop: "2rem" }}>
            <h3 style={{ color: "#007bff" }}>Shipping Region</h3>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="form-select p-3"
              style={{ borderColor: "#007bff" }}
            >
              <option value="">Select Region</option>
              <option value="Nairobi CBD">
                Nairobi CBD / Town - KES 100
              </option>
              <option value="Public Means">
                Public Means (Matatu) - KES 300
              </option>
              <option value="ZONE 1">
                ZONE 1: Upper-Hill, Statehouse, Parklands, Pangani, Mbagathi
                Way, Strathmore Uni - KES 300
              </option>
              <option value="ZONE 2">
                ZONE 2: Kileleshwa, Kilimani, Adams Arcade, Jamhuri, Hurlingham,
                Junction Mall, Westlands, Waiyaki Way, Lavington - KES 300
              </option>
              <option value="ZONE 3">
                ZONE 3: Madaraka, Nairobi West, South B, South C, Langata,
                Kenyatta Market - KES 300
              </option>
              <option value="ZONE 4">
                ZONE 4: KCA, Roysambu, Zimmerman, Kahawa Sukari/West, Ngumba
                Estate, Roasters, Muthaiga - KES 700
              </option>
              <option value="ZONE 5">
                ZONE 5: Kasarani, USIU, Windsor, Mountain View, Mirema, Two
                Rivers, Village Market - KES 500
              </option>
              <option value="ZONE 6">
                ZONE 6 (Suburbs): Karen, Utawala, Embakasi, Fedha, Kiambu
                Road, Thome, Gigiri Nyayo Estate, Kayole, Uthiru - KES 800
              </option>
              <option value="ZONE 7">
                ZONE 7: Buruburu, Donholm, Loresho, Kibera, Kawangware, Umoja -
                KES 500
              </option>
              <option value="ZONE 8">
                ZONE 8 (Upcountry): Kisumu, Nanyuki, Migori, Kapsabet, Eldoret,
                Kericho, Homabay, Nakuru, Isiolo, Lodwar, Machakos, Mombasa - KES
                400
              </option>
              <option value="ZONE 9">ZONE 9 (Eastern): Moyale, Garissa, Wajir - KES 600</option>
              <option value="ZONE 10">ZONE 10 (Eastern): Isiolo - KES 400</option>
              <option value="ZONE 11">ZONE 11 (North Rift): Lodwar - KES 500</option>
            </select>
          </div>

          <div className="payment-method" style={{ marginTop: "2rem" }}>
            <h3>Shipping Method</h3>
            <div className="shipping-box">
              {shippingFee === 0
                ? "Standard - FREE"
                : `Standard - KSh ${shippingFee.toLocaleString()}`}
            </div>

            <h3 style={{ marginTop: "1.5rem" }}>Payment</h3>
            <div className="payment-option">
              <div className="payment-header">
                InstaSend (Pay with Card and M-Pesa)
              </div>
              <div className="payment-illustration">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png"
                  alt="Visa"
                  className="icon"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png"
                  alt="MasterCard"
                  className="icon"
                />
          <img
  src="https://i.pinimg.com/736x/30/54/5b/30545b0c7faf7f887eb931fcf8422687.jpg"
  alt="M-Pesa"
  style={{ width: '80px', height: 'auto', display: 'block' }}
/>

              </div>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                After clicking “Confirm & Proceed to Pay”, you will be redirected
                to InstaSend to complete your purchase securely.
              </p>
            </div>
          </div>

          <div className="form-section" style={{ marginTop: "2rem" }}>
            <label>Billing Address</label>
            <div>
              <input
                type="radio"
                id="sameAddress"
                name="billingAddressSame"
                value={true}
                checked={formData.billingAddressSame}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, billingAddressSame: true }))
                }
              />
              <label htmlFor="sameAddress">Same as shipping address</label>
            </div>
            <div>
              <input
                type="radio"
                id="differentAddress"
                name="billingAddressSame"
                value={false}
                checked={!formData.billingAddressSame}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, billingAddressSame: false }))
                }
              />
              <label htmlFor="differentAddress">Use different billing address</label>
            </div>
          </div>

          {!formData.billingAddressSame && (
            <div className="billing-address-form" style={{ marginTop: "1rem" }}>
              {/* Billing Address Form Inputs */}
              <div className="form-row">
                <div className="form-section half">
                  <label>Billing First name</label>
                  <input
                    type="text"
                    name="billingFirstName"
                    placeholder="Billing First name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-section half">
                  <label>Billing Last name</label>
                  <input
                    type="text"
                    name="billingLastName"
                    placeholder="Billing Last name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-section">
                <label>Billing Address</label>
                <input
                  type="text"
                  name="billingAddress"
                  placeholder="Billing street address"
                  onChange={handleChange}
                />
              </div>
              <div className="form-section">
                <label>Billing Apartment, suite, etc. (optional)</label>
                <input
                  type="text"
                  name="billingApartment"
                  placeholder="Billing Apartment, suite, etc."
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <div className="form-section half">
                  <label>Billing City</label>
                  <input
                    type="text"
                    name="billingCity"
                    placeholder="Billing City"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-section half">
                  <label>Billing Postal code</label>
                  <input
                    type="text"
                    name="billingPostalCode"
                    placeholder="Billing Postal code"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

  {/* RIGHT SIDE */}
<div className="payment-right">
  <h2 className="payment-title">Order Summary</h2>

  <div className="order-items">
    {order.items && order.items.length > 0 ? (
      order.items.map((item, idx) => {
        // Safe image fallback
        const imageSrc = item.images && item.images.length > 0
          ? item.images[0]
          : '/fallback-image.png'; // replace with your fallback path

        return (
          <div key={item.id || idx} className="order-item">
            <img
              src={imageSrc}
              alt={item.name || 'Product image'}
              className="order-item-image"
              onError={e => {
                e.target.onerror = null;
                e.target.src = '/fallback-image.png'; // fallback image on error
              }}
            />
            <div className="order-item-info">
              <p className="order-item-name">{item.name}</p>
              <p className="order-item-quantity">Qty: {item.quantity}</p>
              <p className="order-item-price">
                KES {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })
    ) : (
      <p>No products found in order.</p>
    )}
  </div>

  <div className="order-summary">
    <p>
      Subtotal: <strong>KES {subtotal.toLocaleString()}</strong>
    </p>
    <p>
      Shipping Fee:{" "}
      <strong>
        {shippingFee === 0 ? "FREE" : `KES ${shippingFee.toLocaleString()}`}
      </strong>
    </p>
    <p>
      <strong>Total: KES {total.toLocaleString()}</strong>
    </p>
  </div>

  <button className="btn btn-primary" style={{ marginTop: "2rem" }}>
    Confirm & Proceed to Pay
  </button>
</div>

      </div>
    </div>
  );
}
