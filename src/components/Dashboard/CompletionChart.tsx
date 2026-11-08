export function CompletionChart() {
  return (
    <div className="chart-area">
      <div className="y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
      <div className="chart">
        <div className="grid-lines"><i /><i /><i /><i /><i /></div>
        <svg viewBox="0 0 700 190" preserveAspectRatio="none" aria-label="Completion trend chart">
          <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#9b8cff" stopOpacity=".25" /><stop offset="100%" stopColor="#9b8cff" stopOpacity="0" /></linearGradient></defs>
          <path d="M0,150 C45,142 70,145 104,124 S158,133 188,112 S240,94 270,108 S320,110 350,78 S395,86 430,62 S480,70 510,49 S560,57 590,34 S650,45 700,17 L700,190 L0,190 Z" fill="url(#chartFill)" />
          <path d="M0,150 C45,142 70,145 104,124 S158,133 188,112 S240,94 270,108 S320,110 350,78 S395,86 430,62 S480,70 510,49 S560,57 590,34 S650,45 700,17" fill="none" stroke="#7666ee" strokeWidth="3" />
        </svg>
        <div className="x-axis"><span>Apr 24</span><span>May 01</span><span>May 08</span><span>May 15</span><span>May 22</span></div>
      </div>
    </div>
  )
}
