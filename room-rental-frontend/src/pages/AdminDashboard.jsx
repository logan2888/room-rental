import { useState, useEffect } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/admin/stats"),
      api.get("/admin/users"),
      api.get("/admin/rooms"),
    ])
      .then(([statsRes, usersRes, roomsRes]) => {
        setStats(statsRes.data);
        setUsers(usersRes.data.users);
        setRooms(roomsRes.data.rooms);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteUser = async (id, name) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleDeleteRoom = async (id, title) => {
    if (!confirm(`Delete room "${title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/rooms/${id}`);
      setRooms(rooms.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete room");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <StatCard label="Total Users" value={stats.totalUsers} />
          <StatCard label="Owners" value={stats.totalOwners} />
          <StatCard label="Tenants" value={stats.totalTenants} />
          <StatCard label="Total Rooms" value={stats.totalRooms} />
          <StatCard label="Total Bookings" value={stats.totalBookings} />
          <StatCard label="Platform Revenue" value={`Rs. ${stats.totalPlatformRevenue}`} />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Users</h2>

      <div className="overflow-x-auto border rounded-2xl mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                <td className="px-4 py-3 text-gray-600">{u.email}</td>
                <td className="px-4 py-3 text-gray-600">{u.phone || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    u.role === "admin" ? "bg-purple-100 text-purple-700" :
                    u.role === "owner" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleDeleteUser(u._id, u.name)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Rooms</h2>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-900">{r.title}</td>
                <td className="px-4 py-3 text-gray-600">{r.owner?.name || "Unknown"}</td>
                <td className="px-4 py-3 text-gray-600">{r.location?.city}</td>
                <td className="px-4 py-3 text-gray-600">Rs. {r.pricePerMonth}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    r.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {r.isAvailable ? "Available" : "Not available"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDeleteRoom(r._id, r.title)}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border rounded-2xl p-5 bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-teal-800 mt-1">{value}</p>
    </div>
  );
}

export default AdminDashboard;