const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();

  const database = new sdk.Databases(client);
  const foodSpotId = req.payload;

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);

    let newFoodSpot = {};
    let reviews = [];
    let likes = [];

    if (foodSpotId) {
      try {
        const result = await database.listDocuments(
          "646feb70c324e93d5f31",
          "647033bebb0a81dffe4a",
          [sdk.Query.equal("foodSpotId", foodSpotId)]
        );
        reviews = result.documents;
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }

      try {
        const result = await database.listDocuments(
          "646feb70c324e93d5f31",
          "647033849eb4493510d0",
          [sdk.Query.equal("$id", foodSpotId)]
        );
        likes = result.documents[0].likes;
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }

      const positiveFeedbacks = reviews.filter(
        (review) => review.isPositiveFeedback
      );
      const ratings = +likes.length + positiveFeedbacks.length;

      try {
        newFoodSpot = await database.updateDocument(
          "646feb70c324e93d5f31",
          "647033849eb4493510d0",
          foodSpotId,
          { ratings }
        );
        console.log("🚀 ~ file: index.js:48 ~ newFoodSpot:", newFoodSpot);
        return res.json({ data: newTweet });
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }
    }
  }
};
