"use client";
import React, { useState } from "react";
import ReviewCards from "./ReviewCards";
import NoResults from "@/components/NoResults";
import DeleteModal from "@/components/DeleteModal";

const ReviewContent = ({ reviews }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [foodSpotId, setFoodSpotId] = useState("");

  const [name, setName] = useState("");
  return (
    <>
      {deleteMode && (
        <DeleteModal
          closeModal={() => setDeleteMode(false)}
          collectionId={process.env.NEXT_PUBLIC_REVIEWS}
          name={name}
          documentId={documentId}
          foodSpotId={foodSpotId}
        />
      )}
      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
          <ReviewCards
            key={review.$id}
            review={review}
            setDocumentId={setDocumentId}
            setName={setName}
            setFoodSpotId={setFoodSpotId}
            openDelete={() => setDeleteMode(true)}
          />
        ))}
        {reviews.length == 0 && <NoResults />}
      </div>
    </>
  );
};

export default ReviewContent;
