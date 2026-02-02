import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/login", form);
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  return (
   <div className="container">
      <div className="card">
        <h2>BillBuddy Login</h2>
        <form onSubmit={submit}>
          <input placeholder="Email"
            onChange={e=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password"
            onChange={e=>setForm({...form,password:e.target.value})}/>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
