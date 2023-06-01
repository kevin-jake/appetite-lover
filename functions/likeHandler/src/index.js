const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();

  const database = new sdk.Databases(client);
  const { foodSpotId, likeState, email } = JSON.parse(req.payload);

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
    let newLikes = [];
    let newDislikes = [];
    const isLike = Boolean(likeState === "Like");
    const isDisLike = Boolean(likeState === "Dislike");

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
        dislikes = result.documents[0].dislikes;
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }
      const indexOfLikes = likes.indexOf(email);
      const indexOfDislikes = dislikes.indexOf(email);

      if (isLike && indexOfLikes >= 0) {
        newLikes = likes.splice(indexOfLikes, 1);
      } else if (isDisLike && indexOfLikes >= 0) {
        newLikes = likes.splice(indexOfLikes, 1);
        newDislikes = [...dislikes, email];
      } else if (isDisLike && indexOfDislikes >= 0) {
        newDislikes = dislikes.splice(indexOfLikes, 1);
      } else if (isLike && indexOfDislikes >= 0) {
        newDislikes = dislikes.splice(indexOfDislikes, 1);
        newLikes = [...likes, email];
      } else if (isLike) {
        newLikes = [...likes, email];
      } else if (isDisLike) {
        newDislikes = [...dislikes, email];
      } else {
        newDislikes = dislikes;
        newLikes = likes;
      }
      try {
        const data = { likes: newLikes, dislikes: newDislikes };
        await database.updateDocument(
          "646feb70c324e93d5f31",
          "647033849eb4493510d0",
          foodSpotId,
          data
        );
      } catch (error) {
        console.error(error.message);
      }

      const positiveFeedbacks = reviews.filter(
        (review) => review.isPositiveFeedback
      );
      const ratings =
        newLikes.length - dislikes.length + positiveFeedbacks.length;
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
