import React, { useEffect, useState } from "react";
import "./index.css";
import {
  FailureDataView,
  GetMethodApiData,
  InitialFetchAPiState,
  LoadingDataView,
} from "../Utilities";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const HomePageSlick = () => {
  const [fetchState, setFetchState] = useState(InitialFetchAPiState.INITIAL);
  const [slickData, setSlickData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setFetchState(InitialFetchAPiState.INPROGRESS);
        const path = "book-hub/top-rated-books";
        const apiData = await GetMethodApiData(path);
        const modifyData = apiData.books.map((each) => ({
          id: each.id,
          authorName: each.author_name,
          coverPic: each.cover_pic,
          title: each.title,
        }));
        setFetchState(InitialFetchAPiState.SUCCESS);
        setSlickData(modifyData);
      } catch (error) {
        setErrorMsg(error.message);
        setFetchState(InitialFetchAPiState.FAILURE);
      }
    };

    fetchApi();
  }, []);

  const successView = () => {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Slider {...settings} className="my-5">
        {slickData.map((each) => (
          <div
            key={each.id}
            className="d-flex flex-column align-items-center text-center"
          >
            <Link to={`/books/${each.id}`} className="text-dark">
              <img
                src={each.coverPic}
                alt={each.authorName}
                className="img-fluid rounded slick-img mb-3"
              />
              <h6>{each.authorName}</h6>
            </Link>
          </div>
        ))}
      </Slider>
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
        <div>
          <h1>Find Your Next Favorite Books?</h1>
          <p className="text-secondary">
            <b>
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </b>
          </p>
          <Link to="/bookshelves" className="text-light">
            <button className="btn btn-primary d-lg-none">Find Books</button>
          </Link>
        </div>
        <div className="bg-light-subtle my-3 my-lg-5 p-3 px-lg-5 py-lg-4">
          <div className="d-none d-lg-block  mb-5">
            <div className="d-flex  justify-content-between">
              <h3>Top Rated Books</h3>
              <Link to="/bookshelves" className="text-light">
                <button type="button" className="btn btn-primary">
                  Find Books
                </button>
              </Link>
            </div>
          </div>
          {RenderCondition()}
        </div>
      </div>
    </div>
  );
};

export default HomePageSlick;
