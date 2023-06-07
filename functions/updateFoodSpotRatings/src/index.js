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
    let dislikes = [];

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
        console.log("🚀 ~ file: index.js:48 ~ likes:", likes);
        dislikes = result.documents[0].dislikes;
        console.log("🚀 ~ file: index.js:50 ~ dislikes:", dislikes);
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }

      const positiveFeedbacks = reviews.filter(
        (review) => review.isPositiveFeedback
      );
      console.log(
        "🚀 ~ file: index.js:59 ~ positiveFeedbacks:",
        positiveFeedbacks
      );

      const ratings =
        likes.length -
        dislikes.length +
        (2 * positiveFeedbacks.length - reviews.length);

      console.log("🚀 ~ file: index.js:59 ~ ratings:", ratings);
      try {
        newFoodSpot = await database.updateDocument(
          "646feb70c324e93d5f31",
          "647033849eb4493510d0",
          foodSpotId,
          { ratings: ratings < 0 ? 0 : ratings }
        );
        return res.json(newFoodSpot);
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }
    }
  }
};
