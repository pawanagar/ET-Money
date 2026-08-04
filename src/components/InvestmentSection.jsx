function InvestmentSection() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold mb-4">Smart Investment Options</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="border rounded p-4 h-100">
              <h5>Mutual Funds</h5>
              <p className="text-muted mb-0">Choose funds based on your risk appetite and goals.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border rounded p-4 h-100">
              <h5>Portfolio Tracking</h5>
              <p className="text-muted mb-0">Track performance and rebalance with confidence.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InvestmentSection
