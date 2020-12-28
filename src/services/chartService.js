import firebase from "../config/fbConfig";

export const ChartService = {
  /**
   * convert time from timestamps to month and date(number)
   * @param {*} purchaseMonth
   */
  timeConverter: (purchaseMonth) => {
    var a = new Date(purchaseMonth * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = months[a.getMonth()];
    var date = a.getDate();
    return [date, month];
  },
  /**
   * get sales number for first 10 days of month then second 10 days (from 11 to 20) then for last 10 days of month
   * @param {*} id
   * @param {*} month
   */
  getChartSalesNumber: (id, month) => {
    return new Promise((resolve, reject) => {
      const chartRef = firebase.database().ref("conversions/purchase");
      let first = 0;
      let medium = 0;
      let last = 0;
      chartRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          const chartDay = ChartService.timeConverter(childData.createdAt);
          if (
            childData.offerId == id &&
            chartDay[1] === month &&
            chartDay[0] >= 1 &&
            chartDay[0] <= 10
          ) {
            first++;
          } else if (
            childData.offerId == id &&
            chartDay[1] === month &&
            chartDay[0] >= 11 &&
            chartDay[0] <= 20
          ) {
            medium++;
          } else if (
            childData.offerId == id &&
            chartDay[1] === month &&
            chartDay[0] >= 21 &&
            chartDay[0] <= 31
          ) {
            last++;
          }
        });
        setTimeout(() => {
          resolve([first, medium, last]);
        }, 4000);
      });
    });
  },
};
