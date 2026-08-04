import { useState } from "react";

function formatCurrency(value) {
  return Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function EMI() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [error, setError] = useState("");

  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateEMI = () => {
    setError("");
    if (!loanAmount || !interestRate || !loanTenure) {
      setError("Please fill all fields to calculate EMI.");
      return;
    }

    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(loanTenure);

    if (P <= 0 || annualRate < 0 || years <= 0) {
      setError("Please enter valid positive values for loan details.");
      return;
    }

    const R = annualRate / 12 / 100;
    const N = years * 12;
    const emiValue =
      R === 0
        ? P / N
        : (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    const totalPaymentValue = emiValue * N;
    const totalInterestValue = totalPaymentValue - P;

    setEmi(formatCurrency(emiValue));
    setTotalPayment(formatCurrency(totalPaymentValue));
    setTotalInterest(formatCurrency(totalInterestValue));
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setError("");

    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
  };

  return (
    <div className="container py-5">
      <div className="section-surface p-4 shadow-sm">
        <h2 className="text-center mb-4 text-success">EMI Calculator</h2>

        {error && <div className="alert alert-warning">{error}</div>}

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Loan Amount (₹)</label>
            <input
              type="number"
              min="0"
              step="100"
              className="form-control"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Interest Rate (% per year)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="form-control"
              placeholder="Enter interest rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Loan Tenure (Years)</label>
            <input
              type="number"
              min="0"
              step="0.5"
              className="form-control"
              placeholder="Enter tenure"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mt-4">
          <button className="btn btn-success" onClick={calculateEMI}>
            Calculate EMI
          </button>
          <button className="btn btn-secondary" onClick={resetCalculator}>
            Reset
          </button>
        </div>
      </div>

      {emi && (
        <div className="mt-5">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card metric-card text-center p-4">
                <h5 className="mb-2">Monthly EMI</h5>
                <p className="display-6 text-success">₹ {emi}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card metric-card text-center p-4">
                <h5 className="mb-2">Total Interest</h5>
                <p className="display-6 text-danger">₹ {totalInterest}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card metric-card text-center p-4">
                <h5 className="mb-2">Total Payment</h5>
                <p className="display-6 text-primary">₹ {totalPayment}</p>
              </div>
            </div>
          </div>

          <div className="card section-surface shadow-sm p-4 mt-4">
            <h5 className="mb-3">Breakdown</h5>
            <svg viewBox="0 0 300 140" className="w-100" style={{ height: 180 }}>
              <rect x="24" y="24" width="70" height="92" fill="#198754" rx="12" />
              <rect x="114" y="40" width="70" height="76" fill="#dc3545" rx="12" />
              <rect x="204" y="10" width="70" height="106" fill="#0d6efd" rx="12" />
              <line x1="24" y1="118" x2="276" y2="118" stroke="#d1d5db" strokeWidth="2" />
            </svg>
            <div className="d-flex justify-content-between mt-3 text-muted small">
              <span>Principal</span>
              <span>Interest</span>
              <span>Total</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EMI;
