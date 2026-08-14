import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DistrictSelect from "./DistrictSelect";

function Hero() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (city) params.set("city", city);
    if (budget) params.set("maxPrice", budget);
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <section className="bg-teal-800 rounded-b-[3rem] px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <span className="inline-block bg-teal-700 text-teal-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          ✨ A BETTER WAY HOME
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Find your corner
          <br />
          <span className="text-orange-300">in Nepal.</span>
        </h1>

        <p className="text-teal-100 text-lg mt-6 max-w-xl">
          Monthly rooms and apartments in the places you already know and love —
          with real people, clear rent, and no guesswork.
        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl p-3 mt-10 flex flex-col md:flex-row gap-3 shadow-lg"
        >
          <input
            type="text"
            placeholder="Search area, landmark or room"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl outline-none"
          />

          <DistrictSelect value={city} onChange={setCity} />

          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="px-4 py-3 rounded-xl outline-none border md:border-none bg-gray-50"
          >
            <option value="">Any budget</option>
            <option value="10000">Under Rs. 10,000</option>
            <option value="20000">Under Rs. 20,000</option>
            <option value="30000">Under Rs. 30,000</option>
            <option value="50000">Under Rs. 50,000</option>
          </select>

          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;