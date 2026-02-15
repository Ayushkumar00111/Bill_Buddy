import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
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
        "https://bill-buddy-bg4f.onrender.com/api/subscriptions",
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
   
      
<MainLayout>
   <div  className="page-wrapper" >



      <form className="form-container" onSubmit={onSubmit}>
        
    <h2 className="form-title">Add Subscription</h2>
        <input
        className="form-group"
          type="text"
          name="name"
          placeholder="Subscription Name (Netflix)"
          value={name}
          onChange={onChange}
          required
        />

        <input
        className="form-group"
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={onChange}
          required
        />

        <input
        className="form-group"
          type="date"
          name="startDate"
          value={startDate}
          onChange={onChange}
          required
        />

        <input
        className="form-group"
          type="date"
          name="endDate"
          value={endDate}
          onChange={onChange}
          required
        />


        <button className="primary-btn" type="submit">Add Subscription</button>
      </form>
    
</div>

    </MainLayout>




    

  

  );
};

export default AddSubscription;
