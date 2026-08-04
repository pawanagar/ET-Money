import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold text-success fs-3" to="/">
          ET Money
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/calculators">
                Calculators
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/investments">
                Investments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/insurance">
                Insurance
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/learn">
                Learn
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link className="btn btn-outline-success" to="/contact">
              Login
            </Link>
            <Link className="btn btn-success" to="/calculators">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
