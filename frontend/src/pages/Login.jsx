import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
    password:"",
  });

  const [error, setError] = useState("");

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    console.log("Sending Data:", formData);

    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      //  localStorage.setItem("user", res.data.name);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard");
    } 
    //catch (err) {
    //   console.log(err.response.message)
    //   setError(err.response?.data?.message || "Login failed");
    // }
    catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  setError(err.response?.data?.message || "Login failed");
}

  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

       <input
  name="email"
  value={formData.email}
  placeholder="Email"
  onChange={handleChange}
/>

<input
  type="password"
  name="password"
  value={formData.password}
  placeholder="Password"
  onChange={handleChange}
/>

        <button type="submit">Login</button>

        <p>
          Don’t have an account? <Link to="/">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
