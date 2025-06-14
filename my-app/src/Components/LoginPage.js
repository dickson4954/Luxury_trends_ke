import React, { useState } from "react";
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

    const endpoint = isLogin ? "/login" : "/register";
    const payload = isLogin
      ? {
          username: formData.username_or_email,
          password: formData.password,
        }
      : {
          full_name: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

    try {
      const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); 
        setMessage({ type: "success", text: data.message || "Success!" });

      
      } else {
        setMessage({ type: "error", text: data.message || "Something went wrong." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
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
            <h2>{isLogin ? "LOGIN" : "REGISTER"}</h2>
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
                placeholder="Username or Email *"
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
                {isLogin ? "Create an account" : "Sign In"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
