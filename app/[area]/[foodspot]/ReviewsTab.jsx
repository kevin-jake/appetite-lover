import { database } from "@/libs/appwrite";
import { Query } from "appwrite";
import ReviewContent from "./ReviewContent";

export const revalidate = 0;

const getReviews = async (foodSpotId) => {
  const reviews = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_REVIEWS,
    [Query.equal("foodSpotId", [foodSpotId]), Query.orderDesc("$createdAt")]
  );
  return reviews.documents;
};

const ReviewsTab = async ({ foodSpotId }) => {
  const reviews = await getReviews(foodSpotId);
  return <ReviewContent reviews={reviews} />;
};

export default ReviewsTab;
