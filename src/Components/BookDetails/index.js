import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  FailureDataView,
  GetMethodApiData,
  InitialFetchAPiState,
  LoadingDataView,
} from "../Utilities";
import { FaStar } from "react-icons/fa";
import ContactUs from "../ContactUs";

const BookDetails = (props) => {
  const [fetchState, setFetchState] = useState(InitialFetchAPiState.INITIAL);
  const [bookDetailData, setBookDetailData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setFetchState(InitialFetchAPiState.INPROGRESS);
        const { match } = props;
        const { params } = match;
        const { id } = params;
        const path = `book-hub/books/${id}`;
        const apiData = await GetMethodApiData(path);
        const eachData = apiData.book_details;
        const modifyData = {
          id: eachData.id,
          authorName: eachData.author_name,
          aboutBook: eachData.about_book,
          aboutAuthor: eachData.about_author,
          coverPic: eachData.cover_pic,
          rating: eachData.rating,
          readStatus: eachData.read_status,
          title: eachData.title,
        };
        setBookDetailData(modifyData);
        setFetchState(InitialFetchAPiState.SUCCESS);
      } catch (error) {
        setErrorMsg(error.message);
        setFetchState(InitialFetchAPiState.FAILURE);
      }
    };

    fetchApi();
  }, []);

  const successView = () => {
    return (
      <div className="mt-3 mt-lg-5">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={bookDetailData.coverPic}
            alt={bookDetailData.id}
            className="img-fluid rounded mb-3"
          />
          <h1>{bookDetailData.title}</h1>
          <h4>{bookDetailData.authorName}</h4>
          <div className="d-flex align-items-center my-2">
            <h6 className="me-1 my-0">Avg Rating</h6>
            <FaStar className="me-2 star" />
            {bookDetailData.rating}
          </div>
          <div className="my-2">
            <h6>
              Status :
              <span className="text-primary ms-2">
                {bookDetailData.readStatus}
              </span>
            </h6>
          </div>
        </div>
        <hr />
        <div>
          <h3>About Author</h3>
          <p>{bookDetailData.aboutAuthor}</p>
        </div>
        <div>
          <h3>About Book</h3>
          <p>{bookDetailData.aboutBook}</p>
        </div>
        <ContactUs />
      </div>
    );
  };

  const failureView = () => {
    return FailureDataView(errorMsg);
  };

  const LoadingView = () => {
    return LoadingDataView();
  };

  const RenderCondition = () => {
    switch (fetchState) {
      case InitialFetchAPiState.SUCCESS:
        return successView();
      case InitialFetchAPiState.FAILURE:
        return failureView();
      case InitialFetchAPiState.INPROGRESS:
        return LoadingView();
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <Navbar />
        {RenderCondition()}
      </div>
    </div>
  );
};

export default BookDetails;
