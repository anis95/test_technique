import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { brandService } from "../../services/brandService";
import { ChartService } from "../../services/chartService";
import { commissionService } from "../../services/commissionService";
import { productService } from "../../services/productService";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Deposits from "./Deposits";
import Orders from "./Orders";
import BrandPicture from "./BrandPicture";
import Mois from "./Mois";
import Chart from "./Chart";
import image from "../assets/images/network.png";

const BrandDetails = () => {
  /**
   * Init const
   */
  const classes = useStyles();
  const { id } = useParams();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  /**
   * Init States
   */
  const [data, setData] = useState([]);
  const [salesNumber, setSalesNumber] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [commission, setCommission] = useState([]);
  const [product, setProduct] = useState([]);
  const [month, setMonth] = useState("");
  const [chartSales, setChartSales] = useState([]);
  /**
   * Event handleChange
   * @param {*} event
   */
  const handleChange = async (event) => {
    setMonth(event.target.value);

    brandService
      .getSalesNumber(id, event.target.value)
      .then((res) => setSalesNumber(res));

    brandService.getInfluencer(id, event.target.value).then(async (res) => {
      setInfluencers(res);
    });

    ChartService.getChartSalesNumber(id, event.target.value).then((res) => {
      setChartSales(res);
    });

    commissionService
      .getCommisionInfluencer(id, event.target.value)
      .then(async (res) => {
        setCommission(res);
      });
    productService
      .getProductInfluencer(id, event.target.value)
      .then(async (res) => {
        setProduct(res);
      });
  };

  /**
   * use Effect
   */
  useEffect(() => {
    brandService.getBrandPhoto(id).then((response) => setData(response));
  }, [id]);

  /**
   * Return Content
   */

  return (
    <div
      className={classes.root}
      style={{
        background: "linear-gradient(to right, #ffffcc 0%, #99ccff 100%)",
      }}
    >
      <CssBaseline />

      <main className={classes.content}>
        <img className={classes.logo} src={`${image}`} />
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={4} md={4} lg={4}>
              <BrandPicture data={data} />
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits salesNumber={salesNumber} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <Paper
                className={fixedHeightPaper}
                style={{ overflowY: "hidden" }}
              >
                <Chart chartSales={chartSales} month={month} />
              </Paper>
            </Grid>
            <Mois handleChange={handleChange} month={month} />
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders
                  influencers={influencers}
                  commission={commission}
                  product={product}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  logo: {
    marginTop: "30px",
    marginLeft: "30px",
  },
}));
const drawerWidth = 240;

export default BrandDetails;
