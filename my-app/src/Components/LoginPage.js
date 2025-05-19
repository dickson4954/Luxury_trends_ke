import React, { useState } from "react";
import "../Components/LoginPage.css"; // <-- Make sure this path is correct!

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
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
      email: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.username ||
      !formData.password ||
      (!isLogin && (!formData.fullName || !formData.email))
    ) {
      return "Please fill in all required fields.";
    }
    if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
      return "Invalid email address.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    const error = validateForm();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        setMessage({ type: "success", text: "Login successful! (Simulated)" });
      } else {
        setMessage({ type: "success", text: "Registration successful! (Simulated)" });
      }
    }, 1500);
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
              <input
                type="text"
                placeholder="Full Name *"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            )}
            <input
              type="text"
              placeholder={isLogin ? "Username or Email *" : "Username *"}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {!isLogin && (
              <input
                type="email"
                placeholder="Email *"
                name="email"
                value={formData.email}
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


