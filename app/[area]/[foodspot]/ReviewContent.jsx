"use client";
import React from "react";
import ReviewCards from "./ReviewCards";
import NoResults from "@/components/NoResults";
import DeleteModal from "@/components/DeleteModal";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

const ReviewContent = ({ reviews }) => {
  const { openModal } = useContext(ModalContext);

  return (
    <>
      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
          <ReviewCards
            key={review.$id}
            review={review}
            openDelete={() =>
              openModal(
                <DeleteModal
                  collectionId={process.env.NEXT_PUBLIC_REVIEWS}
                  name={" your review"}
                  documentId={review.$id}
                  foodSpotId={review.foodSpotId}
                />
              )
            }
          />
        ))}
        {reviews.length == 0 && <NoResults />}
      </div>
    </>
  );
};

export default ReviewContent;
