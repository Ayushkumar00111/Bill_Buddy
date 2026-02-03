// import { useEffect, useState } from "react";
// import API from "../api/api";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// export default function Dashboard() {
//   const [subs, setSubs] = useState([]);
//   const [analytics, setAnalytics] = useState({});

//   useEffect(() => {
//     API.get("/subscriptions").then(res => setSubs(res.data));
//     API.get("/analytics").then(res => setAnalytics(res.data));
//   }, []);
//   useEffect(() => {
//   const fetchSubscriptions = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/subscriptions",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSubscriptions(res.data);
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   fetchSubscriptions();
// }, []);


//   return (
//     <div className="container">
//       <div className="card">
//         <h2>Dashboard</h2>
//         <div className="stat">
//           <span>Total Spent</span>
//           <span>₹{analytics.totalSpent}</span>
//         </div>
//         <div className="stat">
//           <span>Wasted Money</span>
//           <span>₹{analytics.wastedMoney}</span>
//         </div>
//       </div>

//       <div className="card">
//         <h3>Your Subscriptions</h3>
//         {subs.map(s => (
//           <div className="stat" key={s._id}>
//             <span>{s.name}</span>
//             <span>{s.status}</span>
//           </div>
//         ))}
      

//       </div>
//        <button onClick={() => navigate("/add-subscription")}>
//   + Add Subscription
// </button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSubscriptions(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const today = new Date();

  const totalSpent = subscriptions.reduce(
    (sum, sub) => sum + sub.price,
    0
  );

  const wastedMoney = subscriptions
    .filter((sub) => new Date(sub.endDate) < today)
    .reduce((sum, sub) => sum + sub.price, 0);

  const activeSubscriptions = subscriptions.filter(
    (sub) => new Date(sub.endDate) >= today
  );

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <MainLayout>
      {
    <div style={{ padding: "20px" }}>
      <h1>📊 BillBuddy Dashboard</h1>

      <button
        onClick={() => navigate("/add-subscription")}
        style={{
          padding: "10px 15px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        + Add Subscription
      </button>

      <div style={{ marginBottom: "20px" }}>
        <h3>💰 Total Spent: ₹{totalSpent}</h3>
        <h3>❌ Wasted Money: ₹{wastedMoney}</h3>
        <h3>✅ Active Subscriptions: {activeSubscriptions.length}</h3>
      </div>

      {subscriptions.length === 0 ? (
        <p>No subscriptions added yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => {
              const isExpired = new Date(sub.endDate) < today;

              return (
                <tr key={sub._id}>
                  <td>{sub.name}</td>
                  <td>₹{sub.price}</td>
                  <td>{sub.startDate.slice(0, 10)}</td>
                  <td>{sub.endDate.slice(0, 10)}</td>
                  <td>
                    {isExpired ? "❌ Expired" : "✅ Active"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>}
    </MainLayout>
  );
};

export default Dashboard;
