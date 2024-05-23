import React, { useState } from "react";
import Stars from "./Stars";

export default function Reviews() {
    const reviews = [
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User1",
          title: "Random Review 1",
          content: "This is a random review about something.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User2",
          title: "Random Review 2",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User3",
          title: "Random Review 3",
          content: "Here's yet another random review about something different.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User4",
          title: "Random Review 4",
          content: "This is yet another random review about something totally different.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User5",
          title: "Random Review 5",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User6",
          title: "Random Review 6",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User7",
          title: "Random Review 7",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User8",
          title: "Random Review 8",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User9",
          title: "Random Review 9",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User10",
          title: "Random Review 10",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User11",
          title: "Random Review 11",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User12",
          title: "Random Review 12",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User13",
          title: "Random Review 13",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User14",
          title: "Random Review 14",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User15",
          title: "Random Review 15",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User16",
          title: "Random Review 16",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User17",
          title: "Random Review 17",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User18",
          title: "Random Review 18",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User19",
          title: "Random Review 19",
          content: "This is another random review about something else.",
        },
        {
          rating: Math.floor(Math.random() * 5) + 1,
          name: "User20",
          title: "Random Review 20",
          content: "This is another random review about something else.",
        },
      ];
      

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="m-20">
      <div className="flex flex-col justify-center items-center mt-10 ">
        <div className="font-semibold text-2xl">Customer Reviews</div>
        <div className="flex flex-col mt-3">
          <div className="flex">
            <Stars number={4.9} />
            <span className="font-thin">4.64 out of 5</span>
          </div>
          <div className="font-thin">Based on {totalReviews} ratings</div>
        </div>
      </div>
      <div>
        {currentReviews.map((review, index) => (
          <div key={index} className="flex flex-col mt-5 bg-orange-100 rounded-lg p-5 hover:scale-105 transition 300ms hover:shadow-lg">
            <Stars number={review.rating} />
            <div className="font-semibold text-xl text-yellow-500 mt-3">{review.name}</div>
            <div className="font-semibold mt-5 leading-relaxed tracking-wide">{review.title}</div>
            <div className="font-normal leading-relaxed tracking-wide">{review.content}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center m-5">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
