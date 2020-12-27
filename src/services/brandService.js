import firebase from "../config/fbConfig";

export const brandService = {
  /**
   * get Brand picture and name
   * @param {*} id
   */
  getBrandPhoto: (id) => {
    return new Promise((resolve, reject) => {
      const imageRef = firebase.database().ref("brands");
      let picture = "";
      let name = "";
      imageRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.offerId == id) {
            picture = childData.pic;
            name = childData.name;

            resolve([picture, name]);
          }
        });
      });
    });
  },
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
   * get sales number and sales amount for brand per month
   * @param {*} id
   * @param {*} month
   */
  getSalesNumber: (id, month) => {
    return new Promise((resolve, reject) => {
      const salesRef = firebase.database().ref("conversions/purchase");
      let sales = 0;
      let amount = 0;

      salesRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          const salesMonth = brandService.timeConverter(childData.createdAt);
          if (childData.offerId == id && salesMonth === month) {
            sales = sales + 1;
            amount = amount + childData.amount;
          }
        });
        setTimeout(() => {
          resolve([sales, amount]);
        }, 4000);
      });
    });
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
        const salesMonth = brandService.timeConverter(childData.createdAt);
        if (childData.offerId == id && salesMonth === month) {
          keyInfluencers.push(childData.influencer);
        }
      });
    });
    return keyInfluencers;
  },
  /**
   * get influencers details (picture, name, email) and sales number for influencer per month
   * @param {*} id
   * @param {*} month
   */
  getInfluencer: async (id, month) => {
    return new Promise((resolve, reject) => {
      let number = 0;
      let influencerKey = brandService.getInfluencerKeyFromBrands(id, month);
      let influencers = [];
      let keyInfluencer = [];
      let salesNumber = [];

      const influencerRef = firebase.database().ref("Influencers");
      influencerRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          influencerKey.forEach((key) => {
            if (key === childKey) {
              influencers.push(childData.Profil);
              keyInfluencer.push(childKey);
            }
          });
        });

        const uniqueInfluencer = influencers.filter(onlyUnique);
        const uniqueKeyInfluencer = keyInfluencer.filter(onlyUnique);

        // function pour éliminé les redondances dans un tableau
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }

        //sales number de chaque influenceur
        uniqueKeyInfluencer.forEach(async (key) => {
          keyInfluencer.forEach((key2) => {
            if (key2 === key) {
              number = number + 1;
            }
          });
          salesNumber.push(number);

          number = 0;
        });

        setTimeout(() => {
          resolve([uniqueInfluencer, salesNumber]);
        }, 4000);
      });
    });
  },
};
