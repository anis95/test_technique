import React from "react";
import Typography from "@material-ui/core/Typography";

import Title from "./Title";

const Deposits = (props) => {
  /**
   *Init props
   */
  const { salesNumber } = props;

  /**
   * Init Content
   */
  return (
    <div>
      <Title align="center">Sales Number</Title>
      <Typography style={{ textAlign: "center" }} component="p" variant="h4">
        {salesNumber[0] ? salesNumber[0] : 0}
      </Typography>
      <Title align="center">Sales Amount</Title>
      <Typography style={{ textAlign: "center" }} component="p" variant="h4">
        {salesNumber[0]
          ? Math.round(salesNumber[1] * 100) / 100 + "  €"
          : 0 + "  €"}
      </Typography>
    </div>
  );
};

export default Deposits;
