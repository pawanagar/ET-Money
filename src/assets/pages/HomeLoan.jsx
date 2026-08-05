import { useState } from "react";
import "../../style/CalculatorBase.css";
import "../../style/HomeLoan.css";

function HomeLoan() {

  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const principal = Number(loanAmount);
  const monthlyRate = interestRate / 12 / 100;
  const months = loanTenure * 12;

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return (
    <div className="home-loan-page">

      <div className="container py-4">

        <h2 className="fw-bold">
          Home Loan Calculator
        </h2>

        <p className="text-muted">
          Calculate your home loan EMI instantly.
        </p>

      </div>

      <div className="container">

        <div className="row g-4">

          {/* Left Side */}

          <div className="col-lg-5">

            <div className="card shadow border-0 p-4">

              <h4 className="mb-4">
                Calculate Home Loan EMI
              </h4>

              {/* Loan Amount */}

              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <label>Loan Amount</label>

                  <strong>
                    ₹ {Number(loanAmount).toLocaleString("en-IN")}
                  </strong>

                </div>

                <input
                  type="range"
                  className="form-range"
                  min="100000"
                  max="20000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />

              </div>

              {/* Interest Rate */}

              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <label>Interest Rate</label>

                  <strong>{interestRate}%</strong>

                </div>

                <input
                  type="range"
                  className="form-range"
                  min="5"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />

              </div>

              {/* Loan Tenure */}

              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <label>Loan Tenure</label>

                  <strong>{loanTenure} Years</strong>

                </div>

                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="30"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                />

              </div>

              <button className="btn btn-success w-100">
                Live Home Loan Calculator
              </button>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-7">

            <div className="card shadow border-0 p-4">

              <h4 className="mb-4">
                Loan Summary
              </h4>

              <div className="row text-center">

                <div className="col-md-4">

                  <div className="summary-box">

                    <h6>Monthly EMI</h6>

                    <h3>
                      ₹ {emi.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </h3>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="summary-box">

                    <h6>Total Interest</h6>

                    <h3>
                      ₹ {totalInterest.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </h3>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="summary-box">

                    <h6>Total Payment</h6>

                    <h3>
                      ₹ {totalPayment.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </h3>

                  </div>

                </div>

              </div>

              <div className="chart-box mt-5">
                <h5 className="chart-title">Payment Split</h5>
                <div className="chart-container">
                  <div
                    className="donut-chart"
                    style={{
                      background: `conic-gradient(#00b386 ${((totalInterest / totalPayment) * 100).toFixed(1)}%, #e9ecef 0)`,
                    }}
                  >
                    <div className="chart-center">
                      <div className="chart-value">
                        {((totalInterest / totalPayment) * 100).toFixed(0)}%
                      </div>
                      <div className="chart-label">Interest</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around mt-3">
                  <div className="pie-legend">
                    <span className="legend-dot principal" />
                    <div>
                      <strong>{(100 - (totalInterest / totalPayment) * 100).toFixed(0)}%</strong>
                      <div>Principal</div>
                    </div>
                  </div>
                  <div className="pie-legend">
                    <span className="legend-dot interest" />
                    <div>
                      <strong>{((totalInterest / totalPayment) * 100).toFixed(0)}%</strong>
                      <div>Interest</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HomeLoan;