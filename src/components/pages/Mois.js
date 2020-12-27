import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export const Mois = (props) => {
  /**
   * Init props
   */
  const { handleChange, month } = props;
  /**
   * Init Const
   */
  const classes = useStyles();
  /**
   * Return Content
   */
  return (
    <FormControl
      className={classes.formControl}
      style={{ marginLeft: "calc(100% / 4)" }}
    >
      <InputLabel id="demo-simple-select-helper-label">Mois</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={month}
        onChange={handleChange}
      >
        <MenuItem value={"Jan"}>Janvier</MenuItem>
        <MenuItem value={"Feb"}>Février</MenuItem>
        <MenuItem value={"Mar"}>Mars</MenuItem>
        <MenuItem value={"Apr"}>Avril</MenuItem>
        <MenuItem value={"May"}>Mai</MenuItem>
        <MenuItem value={"Jun"}>Juin</MenuItem>
        <MenuItem value={"Jul"}>Juillet</MenuItem>
        <MenuItem value={"Aug"}>Aout</MenuItem>
        <MenuItem value={"Sep"}>Septembre</MenuItem>
        <MenuItem value={"Oct"}>Octobre</MenuItem>
        <MenuItem value={"Nov"}>Novembre</MenuItem>
        <MenuItem value={"Dec"}>Décembre</MenuItem>
      </Select>
    </FormControl>
  );
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "550px",
  },
}));
export default Mois;
