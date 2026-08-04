import { useState } from "react";

function SIP() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [years, setYears] = useState("");
  const [futureValue, setFutureValue] = useState(null);

  const calculateSIP = () => {
    if (!monthlyInvestment || !expectedReturn || !years) {
      alert("Please fill all fields.");
      return;
    }

    const P = Number(monthlyInvestment);
    const r = Number(expectedReturn) / 100 / 12;
    const n = Number(years) * 12;

    const fv = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    setFutureValue(fv.toFixed(2));
  };

  const resetCalculator = () => {
    setMonthlyInvestment("");
    setExpectedReturn("");
    setYears("");
    setFutureValue(null);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-success">SIP Calculator</h2>

      <div className="card shadow p-4">
        <div className="mb-3">
          <label className="form-label">Monthly Investment (₹)</label>
          <input
            type="number"
            className="form-control"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Expected Return Rate (%)</label>
          <input
            type="number"
            className="form-control"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Investment Period (Years)</label>
          <input
            type="number"
            className="form-control"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={calculateSIP}>Calculate SIP</button>
          <button className="btn btn-secondary" onClick={resetCalculator}>Reset</button>
        </div>
      </div>

      {futureValue && (
        <div className="mt-4">
          <div className="card shadow p-4 text-center">
            <h4 className="text-success">Estimated Future Value</h4>
            <h2>₹ {futureValue}</h2>
          </div>

          <div className="card shadow p-4 mt-4">
            <h5 className="mb-3">Growth Trend</h5>
            <svg viewBox="0 0 300 140" className="w-100" style={{ height: 180 }}>
              <path d="M10 110 C50 90, 80 70, 110 60 S180 30, 220 40 S280 70, 290 20" fill="none" stroke="#198754" strokeWidth="4" />
              <circle cx="290" cy="20" r="6" fill="#198754" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default SIP;