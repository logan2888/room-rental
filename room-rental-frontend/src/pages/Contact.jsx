function Contact() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-10">
        Have a question, found a bug, or want to give feedback? Reach out — we'd love to hear from you.
      </p>

      <div className="border rounded-2xl p-6 bg-white flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">✉️</span>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <a href="mailto:rijankhatri536@gmail.com" className="text-teal-800 font-medium hover:underline">
              rijankhatri536@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">📞</span>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-900 font-medium">+977 9827782888</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">📍</span>
          <div>
            <p className="text-sm text-gray-500">Based in</p>
            <p className="text-gray-900 font-medium">Nepal</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-8">
        Room Rental is a student capstone project built to explore full-stack development —
        thank you for checking it out.
      </p>
    </div>
  );
}

export default Contact;