import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero py-5">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <span className="badge bg-success-soft text-success mb-3">Financial tools made easy</span>
            <h1 className="display-4 fw-bold mb-3">
              Plan your financial future with clarity.
            </h1>
            <p className="lead text-muted mb-4">
              Powerful calculators for EMI, SIP, FD and more — built to help you save, invest, and grow faster.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-success btn-lg" to="/calculators">
                Explore calculators
              </Link>
              <Link className="btn btn-outline-secondary btn-lg" to="/learn">
                Learn more
              </Link>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <div className="hero-card shadow rounded-4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900"
                className="img-fluid hero-image"
                alt="Finance dashboard"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
