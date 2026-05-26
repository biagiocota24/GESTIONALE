import {
  Bar,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";

interface BarChartProps {
  data: { type: string; price: number }[];
  colors: string[];
}

const MyBarChart = function ({data,colors}:BarChartProps) {
  return (
    <BarChart width={300} height={250} data={data} className="m-auto me">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="type" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="price" radius={[6, 6, 0, 0]}>
        {data.map((entry, i) => (
          <Cell key={i} fill={colors[i]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default MyBarChart;
