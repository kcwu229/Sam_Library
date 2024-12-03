import { axiosInstance } from "../axioConfig";

const REST_BOOKREVIEW_API_URL = "/books-reviews";

export const createBookReview = (bookId, bookReviewData, userId) => {
  return axiosInstance.post(
    REST_BOOKREVIEW_API_URL + "/" + bookId,
    bookReviewData,
    {
      params: {
        userId: userId,
      },
    }
  );
};

export const getBookReview = (bookReviewId) => {
  axiosInstance.get(REST_BOOKREVIEW_API_URL, bookReviewId);
};

export const listAllBookReviews = (bookId, page, pageSize) =>
  axiosInstance.get(REST_BOOKREVIEW_API_URL + "/all/" + bookId, {
    params: {
      page,
      pageSize,
    },
  });

export const deleteBookReview = (bookId, userId, bookReviewId) => {
  return axiosInstance.delete(REST_BOOKREVIEW_API_URL + "/" + bookId, {
    params: {
      bookReviewId: bookReviewId,
      userId: userId,
    },
  });
};
