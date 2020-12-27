import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Title from "./Title";

const Orders = (props) => {
  /**
   * Init props
   */
  const { influencers, commission, product } = props;

  /**
   * Init Const
   */
  const classes = useStyles();
  const influcersDetails = influencers[0];
  const SalesNumberInfluencer = influencers[1];

  /**
   * Return Content
   */

  return (
    <React.Fragment>
      <Title align="left">Details Influencer per Month</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>influencers</TableCell>
            <TableCell>sales Number</TableCell>
            <TableCell>Commission amount</TableCell>
            <TableCell>Product Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {influcersDetails
            ? influcersDetails.map((influencer, key) => (
                <TableRow key={key}>
                  <TableCell>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={`${influencer.banner}`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={influencer.name}
                        secondary={influencer.email}
                      />
                    </ListItem>
                  </TableCell>

                  <TableCell>{SalesNumberInfluencer[key]}</TableCell>
                  <TableCell>{commission[key]}</TableCell>
                  <TableCell>{product[key]}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      <div className={classes.seeMore}></div>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    width: "100%",
    maxWidth: 360,
  },
}));

export default Orders;
