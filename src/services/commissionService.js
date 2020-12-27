import firebase from "../config/fbConfig";

export const commissionService = {
  /**
   * convert time from timestamps to month
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
    var time = month;
    return time;
  },
  /**
   * get All keys for influencers per month
   * @param {*} id
   * @param {*} month
   */
  getInfluencerKeyFromBrands: (id, month) => {
    const influencerKeyRef = firebase.database().ref("conversions/purchase");
    let keyInfluencers = [];
    influencerKeyRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        const salesMonth = commissionService.timeConverter(childData.createdAt);
        if (childData.offerId == id && salesMonth === month) {
          keyInfluencers.push(childData.influencer);
        }
      });
    });
    return keyInfluencers;
  },
  /**
   * get Commission amount for every influencer per month
   * @param {*} id
   * @param {*} month
   */
  getCommisionInfluencer: (id, month) => {
    return new Promise((resolve, reject) => {
      let influencerKey = commissionService.getInfluencerKeyFromBrands(
        id,
        month
      );
      let keyInfluencer = [];
      let commission = 0;
      let commissionNumber = [];

      const influencerRef = firebase.database().ref("Influencers");
      influencerRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;

          influencerKey.forEach((key) => {
            if (key === childKey) {
              keyInfluencer.push(childKey);
            }
          });
        });

        const uniqueKeyInfluencer = keyInfluencer.filter(onlyUnique);

        // function pour éliminé les redondances dans un tableau
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }

        //Récupérer la commission de chaque influenceur
        const commissionRef = firebase.database().ref("conversions/purchase");
        uniqueKeyInfluencer.forEach(async (key) => {
          commissionRef.once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var childData = childSnapshot.val();
              const commissionMonth = commissionService.timeConverter(
                childData.createdAt
              );
              if (
                key === childData.influencer &&
                childData.offerId == id &&
                month === commissionMonth
              ) {
                commission = commission + parseFloat(childData.commission);
              }
            });
            commissionNumber.unshift(commission);
            commission = 0;
          });
        });

        //récupérer le nombre d'article par influencer
        setTimeout(() => {
          resolve(commissionNumber);
        }, 4000);
      });
    });
  },
};
