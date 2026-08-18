import { useState, useEffect } from "react";
import api from "../services/api";

function OwnerInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/inquiries/owner")
      .then((res) => setInquiries(res.data.inquiries))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Inquiries</h1>

      {inquiries.length === 0 ? (
        <p className="text-gray-500">No inquiries yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {inquiries.map((inq) => (
            <div key={inq._id} className="border rounded-xl p-4">
              <p className="font-semibold text-gray-900">{inq.room.title}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(inq.createdAt).toLocaleString()}
              </p>
              <div className="mt-3 border-t pt-3">
                <p className="text-sm"><strong>{inq.sender.name}</strong> ({inq.sender.email}, {inq.sender.phone || "no phone"})</p>
                <p className="text-sm text-gray-700 mt-2">{inq.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerInquiries;