import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function RoomDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moveInDate, setMoveInDate] = useState("");
  const [moveOutDate, setMoveOutDate] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    api.get(`/rooms/${id}`)
      .then((res) => setRoom(res.data.room))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError("");
    setBookingSuccess("");

    if (!user) {
      navigate("/login");
      return;
    }

    setBooking(true);
    try {
      const res = await api.post("/bookings", {
        roomId: id,
        moveInDate,
        moveOutDate,
      });
      setBookingSuccess(`Booking created! Total: Rs. ${res.data.booking.totalPrice}. Go to "My Bookings" to pay.`);
      setMoveInDate("");
      setMoveOutDate("");
    } catch (err) {
      setBookingError(err.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!room) return <div className="text-center py-20">Room not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {room.images.length > 0 && (
        <img src={room.images[0]} alt={room.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      )}

      <h1 className="text-3xl font-bold">{room.title}</h1>
      <p className="text-gray-600 mt-1">{room.location.address}, {room.location.city}</p>
      <p className="text-2xl font-semibold mt-4">Rs. {room.pricePerMonth}/month</p>

      <p className="mt-4">{room.description}</p>

      <div className="mt-4">
        <h3 className="font-bold mb-2">Amenities</h3>
        <ul className="flex flex-wrap gap-2">
          {room.amenities.map((a, i) => (
            <li key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{a}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Listed by {room.owner.name} ({room.owner.phone})
      </div>

      {room.isAvailable ? (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Book this room</h2>

          {bookingError && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
              {bookingError}
            </div>
          )}

          {bookingSuccess && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
              {bookingSuccess}
            </div>
          )}

          <form onSubmit={handleBooking} className="flex flex-col gap-4 max-w-sm">
            <label className="text-sm font-medium">
              Move-in date
              <input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                required
                className="border rounded px-4 py-2 w-full mt-1"
              />
            </label>

            <label className="text-sm font-medium">
              Move-out date
              <input
                type="date"
                value={moveOutDate}
                onChange={(e) => setMoveOutDate(e.target.value)}
                required
                className="border rounded px-4 py-2 w-full mt-1"
              />
            </label>

            <button
              type="submit"
              disabled={booking}
              className="bg-blue-700 text-white rounded px-4 py-2 disabled:opacity-50"
            >
              {booking ? "Booking..." : user ? "Book Now" : "Login to Book"}
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 text-red-600 font-medium">This room is currently unavailable.</div>
      )}
    </div>
  );
}

export default RoomDetail;