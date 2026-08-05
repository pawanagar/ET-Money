import { useMemo, useState } from "react";
import "../../style/CalculatorBase.css";
import "../../style/Mutual.css";

function Mutual() {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentYears, setInvestmentYears] = useState(10);

  const safeInvestmentAmount = useMemo(
    () => Math.max(0, Number(investmentAmount) || 0),
    [investmentAmount]
  );
  const safeExpectedReturn = useMemo(
    () => Math.max(0, Number(expectedReturn) || 0),
    [expectedReturn]
  );
  const safeInvestmentYears = useMemo(
    () => Math.max(1, Number(investmentYears) || 1),
    [investmentYears]
  );

  const maturityAmount = useMemo(
    () =>
      safeInvestmentAmount *
      Math.pow(1 + safeExpectedReturn / 100, safeInvestmentYears),
    [safeInvestmentAmount, safeExpectedReturn, safeInvestmentYears]
  );

  const profit = useMemo(
    () => Math.max(0, maturityAmount - safeInvestmentAmount),
    [maturityAmount, safeInvestmentAmount]
  );

  const chartPoints = useMemo(() => {
    const points = [];
    const steps = Math.min(safeInvestmentYears, 8);
    for (let i = 0; i <= steps; i += 1) {
      const year = Math.round((i / steps) * safeInvestmentYears);
      const value = safeInvestmentAmount * Math.pow(1 + safeExpectedReturn / 100, year);
      points.push({ year, value });
    }
    return points;
  }, [safeInvestmentAmount, safeExpectedReturn, safeInvestmentYears]);

  const maxChartValue = useMemo(
    () => Math.max(...chartPoints.map((point) => point.value), safeInvestmentAmount, 1),
    [chartPoints, safeInvestmentAmount]
  );

  const chartSvgPoints = chartPoints.map((point) => {
    const x = 30 + (point.year / (safeInvestmentYears || 1)) * 260;
    const y = 210 - (point.value / maxChartValue) * 160;
    return { ...point, x, y };
  });

  const chartLine = chartSvgPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const chartArea = `${chartLine} L 290 210 L 30 210 Z`;

  const yLabels = Array.from({ length: 5 }, (_, index) =>
    Math.round(maxChartValue - (maxChartValue / 4) * index)
  );

  const xLabels = chartSvgPoints.map((point) => point.year);

  return (
    <div className="mf-page">
      <div className="container py-4">
        <h2 className="fw-bold">Mutual Fund Calculator</h2>
        <p className="text-muted">Estimate your mutual fund returns for a lumpsum investment.</p>
      </div>

      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card shadow border-0 p-4">
              <h4 className="mb-4">Calculate Returns</h4>

              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <label>Investment Amount</label>
                  <strong>₹ {safeInvestmentAmount.toLocaleString("en-IN")}</strong>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={safeInvestmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <label>Expected Return</label>
                  <strong>{safeExpectedReturn}%</strong>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={safeExpectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <label>Investment Period</label>
                  <strong>{safeInvestmentYears} Years</strong>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="40"
                  value={safeInvestmentYears}
                  onChange={(e) => setInvestmentYears(Number(e.target.value))}
                />
              </div>

              <button className="btn btn-success w-100">Live Calculator</button>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow border-0 p-4">
              <h4 className="mb-4">Investment Summary</h4>

              <div className="row text-center">
                <div className="col-md-4">
                  <div className="summary-box">
                    <h6>Invested Amount</h6>
                    <h3>₹ {safeInvestmentAmount.toLocaleString("en-IN")}</h3>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="summary-box">
                    <h6>Estimated Profit</h6>
                    <h3>₹ {profit.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</h3>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="summary-box">
                    <h6>Total Value</h6>
                    <h3>₹ {maturityAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</h3>
                  </div>
                </div>
              </div>

              <div className="chart-placeholder mt-5 chart-modern">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h5 className="mb-1">Growth Projection</h5>
                    <small className="text-muted">Projected value over your investment period</small>
                  </div>
                  <div className="chart-legend">
                    <span className="legend-dot balance" /> Maturity value
                  </div>
                </div>

                <svg viewBox="0 0 340 240" className="w-100">
                  <defs>
                    <linearGradient id="mfGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b386" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00b386" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <g className="chart-grid">
                    {yLabels.map((label, index) => (
                      <g key={index}>
                        <line x1="30" x2="310" y1={30 + index * 40} y2={30 + index * 40} />
                        <text x="10" y={34 + index * 40} className="chart-axis-label">
                          ₹{label.toLocaleString()}
                        </text>
                      </g>
                    ))}
                  </g>

                  <path d={chartArea} fill="url(#mfGrowth)" />
                  <path d={chartLine} fill="none" stroke="#00b386" strokeWidth="3" strokeLinecap="round" />

                  {chartSvgPoints.map((point, index) => (
                    <g key={index}>
                      <circle cx={point.x} cy={point.y} r="4" fill="#004d40" />
                      <text x={point.x} y={point.y - 12} className="chart-axis-label" textAnchor="middle">
                        {point.year}
                      </text>
                    </g>
                  ))}

                  {xLabels.map((year, index) => (
                    <text key={index} x={30 + (year / (safeInvestmentYears || 1)) * 260} y="230" className="chart-axis-label" textAnchor="middle">
                      {year}
                    </text>
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

export default Mutual;