import { useState } from "react";
import axios from "axios";

export default function SubscriptionTable({ subs, refresh }) {
  const token = localStorage.getItem("token");

  // ✅ STATE INSIDE COMPONENT
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  // ✅ DELETE
  const del = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/subscriptions/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    refresh();
  };

  // ✅ EDIT CLICK
  const handleEdit = (s) => {
    setEditingId(s._id);

    setEditForm({
      name: s.name,
      price: s.price,
      startDate: s.startDate?.split("T")[0],
      endDate: s.endDate?.split("T")[0],
    });
  };

  // ✅ UPDATE API CALL
  const updateSubscription = async () => {
    try {
      await axios.put(
        `https://bill-buddy-bg4f.onrender.com/api/subscriptions/${editingId}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEditingId(null);
      refresh(); // refresh parent list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <table className="subs-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Action</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {subs.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>₹{s.price}</td>
              <td>{new Date(s.startDate).toDateString()}</td>
              <td>{new Date(s.endDate).toDateString()}</td>
              <td>
                {new Date(s.endDate) >= new Date()
                  ? "Active"
                  : "Expired"}
              </td>
              <td>
               
                <button onClick={() => del(s._id)}>Delete</button>
              </td>
               <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ EDIT FORM OUTSIDE TABLE */}
      {editingId && (
        <div className="edit-box">
          <h3>Edit Subscription</h3>

          <input
            placeholder="Name"
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={editForm.price}
            onChange={(e) =>
              setEditForm({ ...editForm, price: e.target.value })
            }
          />

          <input
            type="date"
            value={editForm.startDate}
            onChange={(e) =>
              setEditForm({ ...editForm, startDate: e.target.value })
            }
          />

          <input
            type="date"
            value={editForm.endDate}
            onChange={(e) =>
              setEditForm({ ...editForm, endDate: e.target.value })
            }
          />

          <button onClick={updateSubscription}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      )}
    </>
  );
}

