import { Link } from 'react-router-dom'

function CalculatorSection() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-4 gap-3">
          <div>
            <h2 className="fw-bold">Popular Calculators</h2>
            <p className="text-muted mb-0">Choose the right tool to plan loans, investments, and savings.</p>
          </div>
          <Link className="btn btn-outline-success align-self-center" to="/calculators">
            View all calculators
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card calculator-card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">EMI Calculator</h5>
                <p className="card-text text-muted">Estimate monthly payments for your home, auto, or personal loan.</p>
                <Link className="mt-auto btn btn-success" to="/emi">
                  Calculate EMI
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card calculator-card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">SIP Calculator</h5>
                <p className="card-text text-muted">See how monthly investments grow over time with disciplined SIPs.</p>
                <Link className="mt-auto btn btn-success" to="/sip">
                  Plan SIP
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card calculator-card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">FD Calculator</h5>
                <p className="card-text text-muted">Calculate your fixed deposit maturity amount in seconds.</p>
                <Link className="mt-auto btn btn-success" to="/fd">
                  Check FD
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CalculatorSection
