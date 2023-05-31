import React, { useEffect } from "react";
import ReviewCards from "./ReviewCards";
import NoResults from "@/app/(shared)/NoResults";
import { database } from "@/libs/appwrite";
import { Query } from "appwrite";

export const revalidate = 0;

const getReviews = async (foodSpotId) => {
  const reviews = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_REVIEWS,
    [Query.equal("foodSpotId", [foodSpotId]), Query.orderDesc("$createdAt")]
  );
  return reviews.documents;
};

const ReviewsTab = async ({ foodSpotId, setRefetch }) => {
  const reviews = await getReviews(foodSpotId);
  console.log("🚀 ~ file: ReviewsTab.jsx:23 ~ ReviewsTab ~ reviews:", reviews);
  setRefetch(false);
  return (
    <div className="flex flex-col gap-8">
      {reviews.map((review) => (
        <ReviewCards key={review.$id} review={review} />
      ))}
      {reviews.length == 0 && <NoResults />}
    </div>
  );
};

export default ReviewsTab;
