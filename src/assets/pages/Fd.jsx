import { useMemo, useState } from "react";
import "../../style/CalculatorBase.css";
import "../../style/Fd.css";

function FD() {

  const [depositAmount, setDepositAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(7);
  const [timePeriod, setTimePeriod] = useState(5);

  const safeDepositAmount = useMemo(() => Math.max(0, Number(depositAmount) || 0), [depositAmount]);
  const safeInterestRate = useMemo(() => Math.max(0, Number(interestRate) || 0), [interestRate]);
  const safeTimePeriod = useMemo(() => Math.max(1, Number(timePeriod) || 1), [timePeriod]);

  const maturityAmount = useMemo(
    () => safeDepositAmount * Math.pow(1 + safeInterestRate / 100, safeTimePeriod),
    [safeDepositAmount, safeInterestRate, safeTimePeriod]
  );

  const interestEarned = useMemo(() => Math.max(0, maturityAmount - safeDepositAmount), [maturityAmount, safeDepositAmount]);

  const chartPoints = useMemo(() => {
    const points = [];
    const steps = Math.min(safeTimePeriod, 6);
    for (let i = 0; i <= steps; i += 1) {
      const year = Math.round((i / steps) * safeTimePeriod);
      const value = safeDepositAmount * Math.pow(1 + safeInterestRate / 100, year);
      points.push({ year, value });
    }
    return points;
  }, [safeDepositAmount, safeInterestRate, safeTimePeriod]);

  const maxChartValue = useMemo(
    () => Math.max(...chartPoints.map((point) => point.value), safeDepositAmount, 1),
    [chartPoints, safeDepositAmount]
  );

  const chartSvgPoints = chartPoints.map((point) => {
    const x = 30 + (point.year / (safeTimePeriod || 1)) * 260;
    const y = 210 - (point.value / maxChartValue) * 160;
    return { ...point, x, y };
  });

  const chartLine = chartSvgPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const chartArea = `${chartLine} L 290 210 L 30 210 Z`;

  return (
    <div className="fd-page">

      <div className="container py-4">

        <h2 className="fw-bold">
          Fixed Deposit Calculator
        </h2>

        <p className="text-muted">
          Calculate your FD maturity amount instantly.
        </p>

      </div>

      <div className="container">

        <div className="row g-4">

          {/* Left Side */}

          <div className="col-lg-5">

            <div className="card shadow border-0 p-4">

              <h4 className="mb-4">
                Calculate FD Returns
              </h4>

              {/* Deposit Amount */}

              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <label>Deposit Amount</label>

                  <strong>
                    ₹ {Number(depositAmount).toLocaleString("en-IN")}
                  </strong>

                </div>

                <input
                  type="range"
                  className="form-range"
                  min="10000"
                  max="5000000"
                  step="10000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                />

              </div>

              {/* Interest */}

              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <label>Interest Rate</label>

                  <strong>
                    {interestRate}%
                  </strong>

                </div>

                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="12"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />

              </div>

              {/* Time */}

              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <label>Time Period</label>

                  <strong>
                    {timePeriod} Years
                  </strong>

                </div>

                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="20"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                />

              </div>

              <button className="btn btn-success w-100">
                Live FD Calculator
              </button>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-7">

            <div className="card shadow border-0 p-4">

              <h4 className="mb-4">
                FD Summary
              </h4>

              <div className="row text-center">

                <div className="col-md-4">

                  <div className="summary-box">

                    <h6>Deposit Amount</h6>

                    <h3>

                      ₹ {depositAmount.toLocaleString("en-IN")}

                    </h3>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="summary-box">

                    <h6>Interest Earned</h6>

                    <h3>

                      ₹ {interestEarned.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}

                    </h3>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="summary-box">

                    <h6>Maturity Amount</h6>

                    <h3>

                      ₹ {maturityAmount.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}

                    </h3>

                  </div>

                </div>

              </div>

              <div className="chart-placeholder mt-5 chart-modern">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h5 className="mb-1">FD Growth</h5>
                    <small className="text-muted">Projected value over time</small>
                  </div>
                  <div className="chart-legend">
                    <span className="legend-dot balance" /> Maturity
                  </div>
                </div>
                <svg viewBox="0 0 340 240" className="w-100">
                  <defs>
                    <linearGradient id="fdGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b386" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00b386" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <g className="chart-grid">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <g key={index}>
                        <line x1="30" x2="310" y1={30 + index * 40} y2={30 + index * 40} />
                        <text x="10" y={34 + index * 40} className="chart-axis-label">
                          ₹{Math.round(maxChartValue - (maxChartValue / 4) * index).toLocaleString()}
                        </text>
                      </g>
                    ))}
                  </g>

                  <path d={chartArea} fill="url(#fdGrowth)" />
                  <path d={chartLine} fill="none" stroke="#00b386" strokeWidth="3" strokeLinecap="round" />
                  {chartSvgPoints.map((point, index) => (
                    <g key={index}>
                      <circle cx={point.x} cy={point.y} r="4" fill="#fff" stroke="#00b386" strokeWidth="3" />
                      {index === 0 || index === chartSvgPoints.length - 1 ? (
                        <text x={point.x} y={point.y - 12} className="chart-point-label">
                          ₹{Math.round(point.value).toLocaleString()}
                        </text>
                      ) : null}
                    </g>
                  ))}
                  <text x="170" y="235" textAnchor="middle" className="chart-axis-label">
                    Years
                  </text>
                </svg>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FD;