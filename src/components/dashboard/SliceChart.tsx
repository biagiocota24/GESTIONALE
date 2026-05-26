import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface SliceChartProps {
  data: { name: string; value: number }[];
  colors: string[];
}

const SliceChart = function ({ data, colors }: SliceChartProps) {
  return (
    <PieChart width={250} height={250} className="m-auto">
      <Pie
        data={data} // array di oggetti { name, value }
        dataKey="value" // quale campo usare come valore
        nameKey="name" // quale campo usare come nome
        cx="50%" // centro orizzontale
        cy="50%" // centro verticale
        outerRadius={100} // raggio esterno
      >
        {data.map((category, index) => {
          return <Cell key={index} fill={colors[index]} />;
        })}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SliceChart;
