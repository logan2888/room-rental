import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-6">
          Find Your Perfect Room
        </h1>

        <p className="text-xl mb-10">
          Discover verified rooms for rent across Nepal.
        </p>

        <div className="bg-white rounded-xl p-6 shadow-lg">

          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex items-center border rounded-lg px-4 flex-1">
              <FaMapMarkerAlt className="text-gray-500" />

              <input
                type="text"
                placeholder="Enter location"
                className="w-full p-3 outline-none text-black"
              />
            </div>

            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 rounded-lg flex items-center justify-center gap-2">
              <FaSearch />
              Search
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;