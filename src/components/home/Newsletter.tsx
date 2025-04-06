
"use client"

export function Newsletter() {
  return (
    <section className="py-16 bg-accent/5">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-display mb-4 text-foreground">Subscribe to Our Newsletter</h2>
        <p className="mb-8 text-lg font-primary text-foreground/80">Stay updated with our latest collections and offers</p>
        <form className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 mb-4 border rounded-full bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 font-primary"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
