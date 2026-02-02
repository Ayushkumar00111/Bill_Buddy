import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubscription = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  const { name, price, startDate, endDate } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/subscriptions",
        {
          name,
          price,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Subscription Added Successfully ✅");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Add Subscription</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Subscription Name (Netflix)"
          value={name}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={onChange}
          required
        />

        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={onChange}
          required
        />

        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={onChange}
          required
        />

        <button type="submit">Add Subscription</button>
      </form>
    </div>
  );
};

export default AddSubscription;
