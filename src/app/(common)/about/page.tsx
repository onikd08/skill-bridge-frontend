export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Empowering Learning Through Connection
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-3xl mx-auto">
            Skill-Bridge bridges the gap between passionate tutors and ambitious
            students. Our mission is to make quality education accessible,
            flexible, and effective.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
              🎯 Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To connect students with expert tutors who inspire growth,
              confidence, and academic excellence through personalized learning.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">
              🚀 Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted global platform where education meets
              innovation, empowering learners everywhere to reach their full
              potential.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose TutorConnect?</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">👩‍🏫</div>
              <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
              <p className="text-gray-600">
                Work with experienced and qualified tutors across multiple
                subjects.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">
                Flexible Scheduling
              </h3>
              <p className="text-gray-600">
                Book sessions based on your availability and learning pace.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Trusted Reviews</h3>
              <p className="text-gray-600">
                Transparent ratings and feedback from real students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-indigo-600">500+</h3>
            <p className="text-gray-600 mt-2">Active Tutors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-600">2000+</h3>
            <p className="text-gray-600 mt-2">Students</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-600">10k+</h3>
            <p className="text-gray-600 mt-2">Sessions Completed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-600">4.9★</h3>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="mt-4 text-indigo-100">
          Join TutorConnect today and experience smarter learning.
        </p>
        <div className="mt-6">
          <a
            href="/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow hover:shadow-lg transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
