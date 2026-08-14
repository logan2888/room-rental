import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DistrictSelect from "../components/DistrictSelect";

function CreateRoom() {
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdRoomId, setCreatedRoomId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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

      const res = await api.post("/rooms", payload);
      setCreatedRoomId(res.data.room._id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", imageFile);
      await api.post(`/rooms/${createdRoomId}/upload-image`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/my-rooms");
    } catch (err) {
      setError(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (createdRoomId) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">Room created! Now add a photo</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mb-4"
        />

        <div className="flex gap-2">
          <button
            onClick={handleImageUpload}
            disabled={!imageFile || uploading}
            className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>

          <button
            onClick={() => navigate("/my-rooms")}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">List a New Room</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="title" placeholder="Room title" value={formData.title} onChange={handleChange} required className="border rounded px-4 py-2" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border rounded px-4 py-2" rows="3" />
        <select name="type" value={formData.type} onChange={handleChange} className="border rounded px-4 py-2">
          <option value="single">Single</option>
          <option value="shared">Shared</option>
          <option value="apartment">Apartment</option>
        </select>
        <input type="number" name="pricePerMonth" placeholder="Price per month (Rs.)" value={formData.pricePerMonth} onChange={handleChange} required className="border rounded px-4 py-2" />
        <DistrictSelect
  value={formData.district}
  onChange={(val) => setFormData({ ...formData, district: val, city: val })}
/>
<input type="text" name="city" placeholder="City / Area (e.g. specific place name)" value={formData.city} onChange={handleChange} required className="border rounded px-4 py-2" />
        <input type="text" name="address" placeholder="Full address" value={formData.address} onChange={handleChange} required className="border rounded px-4 py-2" />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated, e.g. wifi, water supply, parking)"
          value={formData.amenities}
          onChange={handleChange}
          className="border rounded px-4 py-2"
        />

        <button type="submit" disabled={loading} className="bg-blue-700 text-white rounded px-4 py-2 disabled:opacity-50">
          {loading ? "Creating..." : "List Room"}
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;