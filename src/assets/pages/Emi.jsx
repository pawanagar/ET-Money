import { useMemo, useState } from "react";
import "../../style/CalculatorBase.css";
import "../../style/Emi.css";

function EMI() {

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const safeLoanAmount = useMemo(() => Math.max(0, Number(loanAmount) || 0), [loanAmount]);
  const safeInterestRate = useMemo(() => Math.max(0, Number(interestRate) || 0), [interestRate]);
  const safeLoanTenure = useMemo(() => Math.max(1, Number(loanTenure) || 1), [loanTenure]);

  const principal = safeLoanAmount;
  const monthlyRate = safeInterestRate / 12 / 100;
  const months = safeLoanTenure * 12;

  const emi = useMemo(() => {
    if (months <= 0 || monthlyRate <= 0) return 0;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  }, [principal, monthlyRate, months]);

  const totalPayment = useMemo(() => emi * months, [emi, months]);
  const totalInterest = useMemo(() => Math.max(0, totalPayment - principal), [totalPayment, principal]);

  const chartPoints = useMemo(() => {
    const points = [];
    const total = months;
    const stepCount = Math.min(8, total);

    for (let i = 0; i <= stepCount; i += 1) {
      const month = Math.round((i / stepCount) * total);
      const balance = month === 0 ? principal : principal * Math.pow(1 + monthlyRate, month) - emi * ((Math.pow(1 + monthlyRate, month) - 1) / monthlyRate);
      const paid = principal - balance;
      points.push({ month, balance: Math.max(0, balance), paid: Math.max(0, paid) });
    }

    return points;
  }, [principal, monthlyRate, months, emi]);

  const maxChartValue = useMemo(
    () => Math.max(...chartPoints.map((point) => Math.max(point.balance, point.paid)), principal, 1),
    [chartPoints, principal]
  );

  const chartSvgPoints = chartPoints.map((point) => {
    const x = 30 + (point.month / (months || 1)) * 260;
    const balanceY = 210 - (point.balance / maxChartValue) * 160;
    const paidY = 210 - (point.paid / maxChartValue) * 160;
    return { ...point, x, balanceY, paidY };
  });

  const balanceLine = chartSvgPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.balanceY}`)
    .join(" ");

  const paidLine = chartSvgPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.paidY}`)
    .join(" ");

  const balanceArea = `${balanceLine} L 290 210 L 30 210 Z`;
  const paidArea = `${paidLine} L 290 210 L 30 210 Z`;

  const valueSteps = 4;
  const yLabels = Array.from({ length: valueSteps + 1 }, (_, i) => Math.round((maxChartValue * (valueSteps - i)) / valueSteps));
  const xLabels = chartSvgPoints.map((point) => point.month === 0 ? 0 : Math.round(point.month / 12));

  return (
    <div className="emi-page">

      <div className="container py-4">

        <h2 className="fw-bold">
          EMI Calculator
        </h2>

        <p className="text-muted">
          Calculate your monthly loan EMI instantly.
        </p>

      </div>

      <div className="container">

        <div className="row g-4">

          {/* LEFT */}

          <div className="col-lg-5">

            <div className="card shadow border-0 p-4">

              <h4 className="mb-4">
                Calculate EMI
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
                  max="10000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e)=>setLoanAmount(e.target.value)}
                />

              </div>

              {/* Interest */}

              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <label>Interest Rate</label>

                  <strong>
                    {interestRate} %
                  </strong>

                </div>

                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e)=>setInterestRate(e.target.value)}
                />

              </div>

              {/* Tenure */}

              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <label>Loan Tenure</label>

                  <strong>
                    {loanTenure} Years
                  </strong>

                </div>

                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="30"
                  value={loanTenure}
                  onChange={(e)=>setLoanTenure(e.target.value)}
                />

              </div>

              <button className="btn btn-success w-100">
                Live EMI Calculator
              </button>

            </div>

          </div>

          {/* RIGHT */}

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

                      ₹ {emi.toLocaleString("en-IN",{
                        maximumFractionDigits:0
                      })}

                    </h3>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="summary-box">

                    <h6>Total Interest</h6>

                    <h3>

                      ₹ {totalInterest.toLocaleString("en-IN",{
                        maximumFractionDigits:0
                      })}

                    </h3>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="summary-box">

                    <h6>Total Payment</h6>

                    <h3>

                      ₹ {totalPayment.toLocaleString("en-IN",{
                        maximumFractionDigits:0
                      })}

                    </h3>

                  </div>

                </div>

              </div>

              <div className="chart-placeholder mt-5 chart-modern">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h5 className="mb-1">EMI Breakdown</h5>
                    <small className="text-muted">Balance vs paid amount over time</small>
                  </div>
                  <div className="chart-legend">
                    <span className="legend-dot balance" /> Balance
                    <span className="legend-dot paid" /> Paid
                  </div>
                </div>

                <svg viewBox="0 0 340 260" className="w-100">
                  <defs>
                    <linearGradient id="emiBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#004d40" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#004d40" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="emiPaid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b386" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#00b386" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <g className="chart-grid">
                    {yLabels.map((value, index) => (
                      <g key={index}>
                        <line x1="30" x2="310" y1={30 + index * 40} y2={30 + index * 40} />
                        <text x="10" y={34 + index * 40} className="chart-axis-label">₹{value.toLocaleString()}</text>
                      </g>
                    ))}
                  </g>

                  <path d={balanceArea} fill="url(#emiBalance)" />
                  <path d={balanceLine} fill="none" stroke="#004d40" strokeWidth="3" strokeLinecap="round" />
                  <path d={paidArea} fill="url(#emiPaid)" />
                  <path d={paidLine} fill="none" stroke="#00b386" strokeWidth="3" strokeLinecap="round" />

                  {chartSvgPoints.map((point, index) => (
                    <g key={index}>
                      <circle cx={point.x} cy={point.balanceY} r="4" fill="#004d40" />
                      <circle cx={point.x} cy={point.paidY} r="4" fill="#00b386" />
                      {index === chartSvgPoints.length - 1 && (
                        <text x={point.x} y="233" className="chart-axis-label">{xLabels[index]}y</text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EMI;