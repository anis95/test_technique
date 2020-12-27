import firebase from "../config/fbConfig";

export const productService = {
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
        const salesMonth = productService.timeConverter(childData.createdAt);
        if (childData.offerId == id && salesMonth === month) {
          keyInfluencers.push(childData.influencer);
        }
      });
    });
    return keyInfluencers;
  },
  /**
   * get number of product added per influencer
   * @param {*} id
   * @param {*} month
   */
  getProductInfluencer: (id, month) => {
    return new Promise((resolve, reject) => {
      let influencerKey = productService.getInfluencerKeyFromBrands(id, month);
      let keyInfluencer = [];
      let product = 0;
      let productNumber = [];

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

        const articleRef = firebase.database().ref("articles");
        uniqueKeyInfluencer.forEach(async (key) => {
          articleRef.once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var childData = childSnapshot.val();
              if (key === childData.uid && childData.offerId == id) {
                product = product + 1;
              }
            });
            productNumber.unshift(product);
            product = 0;
          });
        });

        //récupérer le nombre d'article par influencer
        setTimeout(() => {
          resolve(productNumber);
        }, 4000);
      });
    });
  },
};
