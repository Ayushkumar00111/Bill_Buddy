import { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionTable from "../components/SubsciptionTable";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import SpendChart from "../components/SpendChart";
export default function Dashboard() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  

 
    if (!token) return;

    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get(
          "https://bill-buddy-bg4f.onrender.com/api/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 🔴 IMPORTANT FIX
        // backend sometimes sends { subscriptions: [] }
        // sometimes just []
        const data = res.data.subscriptions || res.data || [];
        setSubs(data);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };
 useEffect(() => {
    fetchSubscriptions();
  }, [token]);

  // ---------- CALCULATIONS ----------
  const today = new Date();

  const activeSubs = subs.filter(
    (s) => new Date(s.endDate) >= today
  );

  const expiredSubs = subs.filter(
    (s) => new Date(s.endDate) < today
  );

  const totalSpend = subs.reduce(
    (sum, s) => sum + Number(s.price || 0),
    0
  );

  const wastedMoney = expiredSubs.reduce(
    (sum, s) => sum + Number(s.price || 0),
    0
  );
  //---alert using 
const upcoming = subs.filter((s) => {
    const end = new Date(s.endDate);
    const diffDays =
      (end - today) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7;
  });
  // ---------- UI ----------
  if (loading) {
    return <p className="loading">Loading dashboard...</p>;
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

  {/* 🔔 ALERT */}
      {upcoming.length > 0 && (
        <div className="alert-box">
          ⚠ {upcoming.length} subscription(s)
          expiring in next 7 days
        </div>
      )}


      {/* STAT CARDS */}
      <div className="stats-grid">
        <StatCard title="Active Subscriptions" value={activeSubs.length} />
        <StatCard title="Expired Subscriptions" value={expiredSubs.length} />
        <StatCard title="Total Spend" value={` ${totalSpend}`} />
        <StatCard title="Wasted Money" value={` ${wastedMoney}`} />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
<SpendChart subs={subs} />
<br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* SUBSCRIPTIONS LIST */}
      <section className="subscriptions">
        <h2>Your Subscriptions</h2>


<SubscriptionTable subs={subs} refresh={fetchSubscriptions} />

        
      </section>
<div>
  
<Footer />
</div>

    </div>
    //start fotter 
    


  );
  

}
