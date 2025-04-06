
"use client"

export function Newsletter() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-8">Stay updated with our latest collections and offers</p>
        <form className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
