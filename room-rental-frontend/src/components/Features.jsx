function Features() {
  const features = [
    {
      icon: "🔍",
      title: "Verified Listings",
      description: "Every room is listed by a real owner with verified contact details — no fake listings, no guesswork.",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description: "See the full monthly rent and platform fee upfront. Pay only a small advance to confirm your booking.",
    },
    {
      icon: "📅",
      title: "Instant Booking",
      description: "Pick your move-in and move-out dates, request the room, and get confirmed — no back-and-forth calls needed.",
    },
    {
      icon: "⭐",
      title: "Real Reviews",
      description: "Read genuine reviews from tenants who've actually stayed, so you know what to expect before you move in.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        Why Room Rental
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="border rounded-2xl p-6 hover:shadow-md transition bg-white">
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;