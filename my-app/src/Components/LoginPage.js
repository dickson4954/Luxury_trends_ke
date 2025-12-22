import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/LoginPage.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    username_or_email: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(null);
    setFormData({
      fullName: "",
      username: "",
      username_or_email: "",
      email: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      (isLogin && (!formData.username_or_email || !formData.password)) ||
      (!isLogin &&
        (!formData.fullName || !formData.username || !formData.email || !formData.password))
    ) {
      return "Please fill in all required fields.";
    }

    if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
      return "Invalid email address.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const error = validateForm();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setLoading(true);

    if (isLogin) {
      // LOGIN - Connect to actual backend
      try {
        const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username_or_email,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isAdmin", data.is_admin);
          
          setMessage({ 
            type: "success", 
            text: data.message || "Login successful! Redirecting..." 
          });

          // Automatically redirect to admin dashboard for admin users
          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 1500);
          
        } else {
          setMessage({ 
            type: "error", 
            text: data.message || "Login failed. Please check your credentials." 
          });
        }
      } catch (err) {
        setMessage({ type: "error", text: "Network error. Please try again." });
      } finally {
        setLoading(false);
      }
    } else {
      // REGISTRATION - Connect to actual backend
      try {
        const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isAdmin", data.user.is_admin);
          
          setMessage({ 
            type: "success", 
            text: data.message || "Registration successful!" 
          });

          // For registration, you might want to redirect to login or home
          setTimeout(() => {
            navigate("/");
          }, 1500);
          
        } else {
          setMessage({ 
            type: "error", 
            text: data.message || "Registration failed." 
          });
        }
      } catch (err) {
        setMessage({ type: "error", text: "Network error. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="login-page">
        <div className="form">
          <form
            className={isLogin ? "login-form" : "register-form"}
            onSubmit={handleSubmit}
          >
            <h2>{isLogin ? "ITURIU ELECTRICALS ADMIN" : "REGISTER"}</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '20px' }}>
              {isLogin ? "Admin Access Only" : "Create new account"}
            </p>
            
            {message && <div className={`message ${message.type}`}>{message.text}</div>}

            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Full Name *"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Username *"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            {isLogin && (
              <input
                type="text"
                placeholder="Admin Username or Email *"
                name="username_or_email"
                value={formData.username_or_email}
                onChange={handleInputChange}
                required
              />
            )}

            <input
              type="password"
              placeholder="Password *"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </button>

            <p className="message">
              {isLogin ? "Not registered? " : "Already registered? "}
              <button type="button" className="toggle-btn" onClick={toggleForm}>
                {isLogin ? "Create an account" : "Admin Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;