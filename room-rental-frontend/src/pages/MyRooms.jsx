import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/rooms/my")
      .then((res) => setRooms(res.data.rooms))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      setRooms(rooms.filter(r => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleToggleAvailability = async (id, currentStatus) => {
    try {
      await api.put(`/rooms/${id}`, { isAvailable: !currentStatus });
      setRooms(rooms.map(r => r._id === id ? { ...r, isAvailable: !currentStatus } : r));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Rooms</h1>
        <Link to="/create-room" className="bg-blue-700 text-white px-4 py-2 rounded">
          + Add Room
        </Link>
      </div>

      {rooms.length === 0 ? (
        <p>You haven't listed any rooms yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {rooms.map((r) => (
            <div key={r._id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">{r.title}</h2>
                <p className="text-sm text-gray-600">{r.location.city} - Rs. {r.pricePerMonth}/month</p>
                <span className={`text-xs ${r.isAvailable ? "text-green-600" : "text-red-600"}`}>
                  {r.isAvailable ? "Available" : "Not available"}
                </span>
                <button
                  onClick={() => handleToggleAvailability(r._id, r.isAvailable)}
                  className="text-xs underline text-blue-600 block mt-1"
                >
                  {r.isAvailable ? "Mark as unavailable" : "Mark as available again"}
                </button>
              </div>
              <button onClick={() => handleDelete(r._id)} className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRooms;