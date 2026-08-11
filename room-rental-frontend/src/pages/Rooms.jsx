import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (filterCity = "") => {
    setLoading(true);
    try {
      const params = filterCity ? { city: filterCity } : {};
      const res = await api.get("/rooms", { params });
      setRooms(res.data.rooms);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRooms(city);
  };

  if (loading) return <div className="text-center py-20">Loading rooms...</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Available Rooms</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Search by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded px-4 py-2 flex-1"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Link
              to={`/rooms/${room._id}`}
              key={room._id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {room.images.length > 0 ? (
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  No image
                </div>
              )}
              <div className="p-4">
                <h2 className="font-bold text-lg">{room.title}</h2>
                <p className="text-sm text-gray-600">{room.location.city}</p>
                <p className="font-semibold mt-2">Rs. {room.pricePerMonth}/month</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rooms;