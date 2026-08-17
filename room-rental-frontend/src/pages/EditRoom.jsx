import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import DistrictSelect from "../components/DistrictSelect";

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "single",
    pricePerMonth: "",
    city: "",
    district: "",
    address: "",
    amenities: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/rooms/${id}`)
      .then((res) => {
        const r = res.data.room;
        setFormData({
          title: r.title,
          description: r.description || "",
          type: r.type,
          pricePerMonth: r.pricePerMonth,
          city: r.location.city,
          district: r.location.district || "",
          address: r.location.address,
          amenities: r.amenities.join(", "),
        });
      })
      .catch((err) => setError("Failed to load room"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        pricePerMonth: Number(formData.pricePerMonth),
        location: {
          city: formData.city,
          district: formData.district,
          address: formData.address,
        },
        amenities: formData.amenities
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a.length > 0),
      };

      await api.put(`/rooms/${id}`, payload);
      navigate("/my-rooms");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update room");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Edit Room</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="title" placeholder="Room title" value={formData.title} onChange={handleChange} required className="border rounded-xl px-4 py-2" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border rounded-xl px-4 py-2" rows="3" />
        <select name="type" value={formData.type} onChange={handleChange} className="border rounded-xl px-4 py-2">
          <option value="single">Single</option>
          <option value="shared">Shared</option>
          <option value="apartment">Apartment</option>
        </select>
        <input type="number" name="pricePerMonth" placeholder="Price per month (Rs.)" value={formData.pricePerMonth} onChange={handleChange} required className="border rounded-xl px-4 py-2" />

        <DistrictSelect
          value={formData.district}
          onChange={(val) => setFormData({ ...formData, district: val, city: val })}
        />

        <input type="text" name="city" placeholder="City / Area (e.g. specific place name)" value={formData.city} onChange={handleChange} required className="border rounded-xl px-4 py-2" />
        <input type="text" name="address" placeholder="Full address" value={formData.address} onChange={handleChange} required className="border rounded-xl px-4 py-2" />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={formData.amenities}
          onChange={handleChange}
          className="border rounded-xl px-4 py-2"
        />

        <button type="submit" disabled={saving} className="bg-teal-800 text-white rounded-xl px-4 py-2 disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditRoom;