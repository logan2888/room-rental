import { useState, useRef, useEffect } from "react";
import { districts } from "../data/districts";

function DistrictSelect({ value, onChange, placeholder = "Any district" }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = districts.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (district) => {
    onChange(district);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-4 py-3 rounded-xl outline-none border md:border-none bg-gray-50 text-left w-full flex justify-between items-center gap-2"
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <span className="text-gray-400">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-56 bg-white border rounded-xl shadow-lg max-h-72 overflow-hidden flex flex-col">
          <input
            type="text"
            autoFocus
            placeholder="Search district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border-b outline-none text-sm"
          />
          <div className="overflow-y-auto">
            <div
              onClick={() => handleSelect("")}
              className="px-4 py-2 text-sm hover:bg-teal-50 cursor-pointer text-gray-500"
            >
              Any district
            </div>
            {filtered.map((d) => (
              <div
                key={d}
                onClick={() => handleSelect(d)}
                className="px-4 py-2 text-sm hover:bg-teal-50 cursor-pointer text-gray-900"
              >
                {d}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-400">No match found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DistrictSelect;