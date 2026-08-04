function BlogSection() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold mb-4">Latest from the Blog</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="border rounded p-4 h-100">
              <h5>Budgeting Basics</h5>
              <p className="text-muted mb-0">Learn how to manage money with confidence.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border rounded p-4 h-100">
              <h5>Tax Planning Tips</h5>
              <p className="text-muted mb-0">Save smarter before the filing season arrives.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border rounded p-4 h-100">
              <h5>Investment Discipline</h5>
              <p className="text-muted mb-0">Stay consistent and build long-term wealth.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
