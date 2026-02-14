import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SpendChart({ subs }) {
  const data = subs.map(s => ({
    name: s.name,
    price: Number(s.price),
  }));

  return (
    <div className="chart-card">
      <h3>Subscription Spend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
