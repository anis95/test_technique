import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

export const BrandPicture = (props) => {
  /**
   * Init props
   */
  const { data } = props;

  /**
   * Init Const
   */
  const classes = useStyles();

  /**
   * Return Content
   */
  return (
    <div>
      <Avatar
        className={classes.large}
        variant="square"
        alt=""
        src={`${data[0]}`}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(28),
    marginLeft: 90,
  },
}));

export default BrandPicture;
