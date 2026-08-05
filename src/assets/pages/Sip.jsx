import { useMemo, useState } from "react";
import "../../style/CalculatorBase.css";
import "../../style/Sip.css";

function SIP() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const safeMonthlyInvestment = useMemo(() => Math.max(0, Number(monthlyInvestment) || 0), [monthlyInvestment]);
  const safeExpectedReturn = useMemo(() => Math.max(0, Number(expectedReturn) || 0), [expectedReturn]);
  const safeTimePeriod = useMemo(() => Math.max(0, Number(timePeriod) || 0), [timePeriod]);

  const investedAmount = useMemo(() => safeMonthlyInvestment * safeTimePeriod * 12, [safeMonthlyInvestment, safeTimePeriod]);

  const futureValue = useMemo(() => {
    const monthlyRate = safeExpectedReturn / 100 / 12;
    const months = safeTimePeriod * 12;

    if (months <= 0 || monthlyRate <= 0) {
      return investedAmount;
    }

    return safeMonthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  }, [safeMonthlyInvestment, safeExpectedReturn, safeTimePeriod, investedAmount]);

  const estimatedReturns = useMemo(() => Math.max(0, futureValue - investedAmount), [futureValue, investedAmount]);

  const chartPoints = useMemo(() => {
    const points = [];
    const totalMonths = safeTimePeriod * 12;
    const steps = Math.max(1, Math.min(6, totalMonths));
    const monthlyRate = safeExpectedReturn / 100 / 12;

    for (let i = 0; i <= steps; i += 1) {
      const month = Math.round((i / steps) * totalMonths);
      const value = month === 0 || monthlyRate <= 0
        ? safeMonthlyInvestment * month
        : safeMonthlyInvestment * (((Math.pow(1 + monthlyRate, month) - 1) / monthlyRate) * (1 + monthlyRate));
      points.push({ month, value });
    }

    return points;
  }, [safeMonthlyInvestment, safeExpectedReturn, safeTimePeriod]);

  const maxChartValue = Math.max(...chartPoints.map((point) => point.value), investedAmount, 1);

  const chartPointsSvg = chartPoints.map((point) => {
    const x = (point.month / (safeTimePeriod * 12 || 1)) * 280 + 30;
    const y = 210 - (point.value / maxChartValue) * 160;
    return { ...point, x, y };
  });

  const chartPath = chartPointsSvg
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const chartAreaPath = `${chartPath} L 310 210 L 30 210 Z`;

  return (
    <div className="sip-page">
      <div className="container py-4">
        <h2 className="fw-bold">SIP Calculator</h2>
        <p className="text-muted">Calculate the future value of your SIP investment.</p>
      </div>

      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card shadow border-0 p-4">
              <h4 className="mb-4">Calculate your SIP</h4>

              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <label>Monthly Investment</label>
                  <strong>₹ {safeMonthlyInvestment.toLocaleString()}</strong>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="500"
                  max="200000"
                  step="500"
                  value={safeMonthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
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
                  value={safeExpectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <label>Time Period</label>
                  <strong>{safeTimePeriod} Years</strong>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="40"
                  value={safeTimePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                />
              </div>

              <button type="button" className="btn btn-success w-100" disabled>
                Calculate SIP
              </button>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow border-0 p-4">
              <h4 className="mb-4">Investment Summary</h4>
              <div className="row text-center">
                <div className="col-md-4">
                  <div className="summary-box">
                    <h6>Invested Amount</h6>
                    <h3>₹ {investedAmount.toLocaleString()}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="summary-box">
                    <h6>Estimated Returns</h6>
                    <h3>₹ {estimatedReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="summary-box">
                    <h6>Total Value</h6>
                    <h3>₹ {futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                  </div>
                </div>
              </div>

              <div className="chart-placeholder mt-5 chart-modern">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h5 className="mb-1">Growth Chart</h5>
                    <small className="text-muted">Projected value over time</small>
                  </div>
                  <span className="badge bg-success">Live preview</span>
                </div>
                <svg viewBox="0 0 340 240" className="w-100">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b386" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#00b386" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  <g className="chart-grid">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="30"
                        x2="310"
                        y1={30 + i * 40}
                        y2={30 + i * 40}
                        stroke="#e9ecef"
                        strokeWidth="1"
                      />
                    ))}
                  </g>

                  <path d={chartAreaPath} fill="url(#chartGradient)" opacity="0.9" />
                  <path d={chartPath} fill="none" stroke="#00b386" strokeWidth="4" strokeLinecap="round" />

                  {chartPointsSvg.map((point, index) => (
                    <g key={index}>
                      <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#00b386" strokeWidth="3" />
                      <circle cx={point.x} cy={point.y} r="2.5" fill="#00b386" />
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

export default SIP;
