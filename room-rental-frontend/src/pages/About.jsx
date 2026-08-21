function About() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About Room Rental</h1>
      <p className="text-gray-600 text-lg mb-10">
        A simple, honest way to find and list monthly rooms across Nepal.
      </p>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Why we built this</h2>
          <p className="text-gray-600 leading-relaxed">
            Finding a room to rent in Nepal usually means relying on word of mouth,
            unreliable Facebook groups, or agents who charge extra fees. Room Rental
            connects tenants directly with room owners — no middlemen, no hidden costs,
            just clear listings and transparent pricing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="border rounded-2xl p-5 bg-white">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-1">Search</h3>
              <p className="text-sm text-gray-600">Browse verified rooms by district, budget, and amenities.</p>
            </div>
            <div className="border rounded-2xl p-5 bg-white">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-semibold text-gray-900 mb-1">Request</h3>
              <p className="text-sm text-gray-600">Pick your dates and send a request. Pay only a small advance to confirm.</p>
            </div>
            <div className="border rounded-2xl p-5 bg-white">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="font-semibold text-gray-900 mb-1">Move in</h3>
              <p className="text-sm text-gray-600">Connect with the owner directly and settle the remaining rent on arrival.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">For room owners</h2>
          <p className="text-gray-600 leading-relaxed">
            List your room in minutes, manage bookings and inquiries from one dashboard,
            and get notified the moment someone's interested — no more juggling phone calls
            and missed messages.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;