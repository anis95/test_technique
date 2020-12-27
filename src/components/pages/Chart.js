import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";

function createData(sales, amount) {
  return { sales, amount };
}

const Chart = (props) => {
  /**
   * Init props
   */
  const { chartSales, month } = props;

  /**
   * Init Const
   */
  const theme = useTheme();
  const data = [
    createData("1", 0),
    createData("10", chartSales[0]),
    createData("20", chartSales[1]),
    createData(`31`, chartSales[2]),
  ];

  /**
   * Return Content
   */
  return (
    <React.Fragment>
      <Title>{month}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
          style={{ height: "180px" }}
        >
          <XAxis dataKey="sales" stroke={theme.palette.text.secondary} />

          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Sales per month (€)
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};
export default Chart;
