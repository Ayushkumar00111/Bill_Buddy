import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", formData);

    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
        <div className="container">
      <div className="card">
        <h2>Create Account</h2>
        <form onSubmit={submit}>
          <input placeholder="Name"
            onChange={e=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Email"
            onChange={e=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password"
            onChange={e=>setForm({...form,password:e.target.value})}/>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}
