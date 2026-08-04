import { useState } from "react";

function FD() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [maturityValue, setMaturityValue] = useState(null);

  const calculateFD = () => {
    if (!principal || !rate || !years) {
      alert("Please fill all fields.");
      return;
    }

    const P = Number(principal);
    const R = Number(rate) / 100;
    const T = Number(years);
    const A = P * Math.pow(1 + R, T);

    setMaturityValue(A.toFixed(2));
  };

  const resetCalculator = () => {
    setPrincipal("");
    setRate("");
    setYears("");
    setMaturityValue(null);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-success">FD Calculator</h2>

      <div className="card shadow p-4">
        <div className="mb-3">
          <label className="form-label">Principal Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Interest Rate (%)</label>
          <input
            type="number"
            className="form-control"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deposit Period (Years)</label>
          <input
            type="number"
            className="form-control"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={calculateFD}>Calculate FD</button>
          <button className="btn btn-secondary" onClick={resetCalculator}>Reset</button>
        </div>
      </div>

      {maturityValue && (
        <div className="mt-4">
          <div className="card shadow p-4 text-center">
            <h4 className="text-success">Maturity Value</h4>
            <h2>₹ {maturityValue}</h2>
          </div>

          <div className="card shadow p-4 mt-4">
            <h5 className="mb-3">Growth Chart</h5>
            <svg viewBox="0 0 300 140" className="w-100" style={{ height: 180 }}>
              <rect x="20" y="30" width="40" height="80" fill="#0d6efd" />
              <rect x="90" y="20" width="40" height="90" fill="#198754" />
              <rect x="160" y="10" width="40" height="100" fill="#ffc107" />
              <rect x="230" y="0" width="40" height="110" fill="#dc3545" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default FD;