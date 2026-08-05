import { Link } from 'react-router-dom'

function Calculators() {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-success">Financial Calculators</h1>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card p-3 shadow h-100">
            <h4>EMI Calculator</h4>
            <p className="text-muted">Estimate monthly loan payments instantly.</p>
            <Link className="btn btn-success mt-auto" to="/emi">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow h-100">
            <h4>SIP Calculator</h4>
            <p className="text-muted">Plan your mutual fund investments with confidence.</p>
            <Link className="btn btn-success mt-auto" to="/sip">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow h-100">
            <h4>FD Calculator</h4>
            <p className="text-muted">Check how much your fixed deposit will grow.</p>
            <Link className="btn btn-success mt-auto" to="/fd">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow h-100">
            <h4>Home Loan Calculator</h4>
            <p className="text-muted">Estimate your home loan EMI and total payment.</p>
            <Link className="btn btn-success mt-auto" to="/home-loan">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow h-100">
            <h4>Mutual Fund Calculator</h4>
            <p className="text-muted">Estimate your lumpsum mutual fund returns.</p>
            <Link className="btn btn-success mt-auto" to="/mutual-fund">
              Open
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculators;