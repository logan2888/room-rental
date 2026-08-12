import { useState, useEffect } from "react";
import api from "../services/api";

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bookings/owner")
      .then((res) => setBookings(res.data.bookings))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Bookings on My Rooms</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((b) => (
            <div key={b._id} className="border rounded-lg p-4">
              <h2 className="font-bold text-lg">{b.room.title}</h2>
              <p className="text-sm text-gray-600">{b.room.location.city}</p>
              <p className="mt-1">
                {new Date(b.moveInDate).toLocaleDateString()} → {new Date(b.moveOutDate).toLocaleDateString()}
              </p>
              <p className="font-semibold mt-1">Total: Rs. {b.totalPrice}</p>

              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                b.status === "confirmed" ? "bg-green-100 text-green-700" :
                b.status === "cancelled" ? "bg-red-100 text-red-700" :
                "bg-yellow-100 text-yellow-700"
              }`}>
                {b.status}
              </span>

              <div className="mt-3 border-t pt-3">
                <h3 className="font-semibold text-sm mb-1">Tenant Details</h3>
                <p className="text-sm">{b.user.name}</p>
                <p className="text-sm text-gray-600">{b.user.email}</p>
                <p className="text-sm text-gray-600">{b.user.phone}</p>
              </div>

              {b.payment && (
                <div className="mt-3 border-t pt-3">
                  <h3 className="font-semibold text-sm mb-1">Payment</h3>
                  <p className="text-sm">Advance: Rs. {b.payment.amount}</p>
                  <p className="text-sm">Your share: Rs. {b.payment.ownerAmount}</p>
                  {b.payment.proofImage ? (
                    <img src={b.payment.proofImage} alt="Payment proof" className="mt-2 w-48 rounded border" />
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">No proof uploaded yet</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerBookings;