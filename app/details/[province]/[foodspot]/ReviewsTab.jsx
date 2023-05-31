import React from "react";
import ReviewCards from "./ReviewCards";
import NoResults from "@/app/(shared)/NoResults";

const ReviewsTab = ({ reviews }) => {
  return (
    <section className="pt-4 pb-1">
      <div className="text-left">
        <h4 className="text-3xl mb-4 dark:text-lime-200 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Reviews
        </h4>
      </div>
      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
          <ReviewCards key={review.$id} review={review} />
        ))}
      </div>
      {reviews.length == 0 && <NoResults />}
    </section>
  );
};

export default ReviewsTab;
