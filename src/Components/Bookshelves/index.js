import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { CiSearch } from "react-icons/ci";
import {
  BookshelvesValue,
  FailureDataView,
  GetMethodApiData,
  InitialFetchAPiState,
  LoadingDataView,
  SearchResultsNotFound,
} from "../Utilities";
import "./index.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Bookshelves = () => {
  const [fetchState, setFetchState] = useState(InitialFetchAPiState.INITIAL);
  const [booksData, setBooksData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentBook, setCurrentBook] = useState(BookshelvesValue[0].value);
  const [currentBookLabel, setCurrentBookLabel] = useState(
    BookshelvesValue[0].label
  );
  const [searchInputValue, setSearchInputValue] = useState("");

  const fetchApi = async () => {
    try {
      setFetchState(InitialFetchAPiState.INPROGRESS);

      const path = `book-hub/books?shelf=${currentBook}&search=${searchInputValue}`;
      const apiData = await GetMethodApiData(path);
      const modifyData = apiData.books.map((each) => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        rating: each.rating,
        title: each.title,
        readStatus: each.read_status,
      }));
      setBooksData(modifyData);
      setFetchState(InitialFetchAPiState.SUCCESS);
    } catch (error) {
      setFetchState(InitialFetchAPiState.FAILURE);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [currentBook]);

  const onclickChangeBook = (each) => {
    setCurrentBook(each.value);
    setCurrentBookLabel(each.label);
  };

  const onchangeSearchValue = (event) => {
    setSearchInputValue(event.target.value);
  };

  const onclickSearchBtn = () => {
    if (searchInputValue !== "") {
      fetchApi();
    } else {
      alert("Please Enter Value");
    }
  };

  const successView = () => {
    return (
      <div className="books-container">
        <div className="d-none d-lg-block">
          <div className="d-flex justify-content-around p-3">
            <h4>{currentBookLabel} Books</h4>
            <div className="d-flex align-items-center justify-content-between border rounded">
              <input
                type="search"
                placeholder="Search"
                className="form-control shadow-none border-0"
                value={searchInputValue}
                onChange={onchangeSearchValue}
              />
              <button
                type="button"
                className="btn border-0"
                onClick={onclickSearchBtn}
              >
                <CiSearch className="search-icon" />
              </button>
            </div>
          </div>
        </div>
        <ul className="d-flex flex-wrap justify-content-center">
          {booksData.length > 0 &&
            booksData.map((each) => (
              <li
                key={each.id}
                className="col-12 col-md-5 m-2 border rounded p-2"
              >
                <Link to={`/books/${each.id}`} className="text-dark">
                  <div className="d-flex">
                    <div className="col-4">
                      <img
                        src={each.coverPic}
                        alt={each.id}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="ms-3">
                      <div className="my-2">
                        <h5>{each.title}</h5>
                        <h6>{each.authorName}</h6>
                      </div>
                      <div className="d-flex align-items-center my-2">
                        <h6 className="me-1 my-0">Avg Rating</h6>
                        <FaStar className="me-2 star" />
                        {each.rating}
                      </div>
                      <div className="my-2">
                        <h6>
                          Status :
                          <span className="text-primary ms-2">
                            {each.readStatus}
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          {booksData.length < 1 && SearchResultsNotFound(searchInputValue)}
        </ul>
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
        <div className="mt-2">
          <div className="d-flex justify-content-between align-items-center form-control d-lg-none">
            <input
              type="search"
              placeholder="Search"
              className="border-0 w-100"
              value={searchInputValue}
              onChange={onchangeSearchValue}
            />
            <button
              type="button"
              className="btn border-0"
              onClick={onclickSearchBtn}
            >
              <CiSearch className="search-icon" />
            </button>
          </div>
          <div className="d-lg-flex side-bar">
            <div className="mt-2 lg-border col-lg-3">
              <h3>Bookshelves</h3>
              <ul className="d-flex flex-wrap flex-lg-column">
                {BookshelvesValue.map((each) => (
                  <li key={each.id} className="m-2">
                    <button
                      type="button"
                      className={
                        each.value === currentBook
                          ? "btn btn-primary"
                          : "btn btn-secondary"
                      }
                      onClick={() => onclickChangeBook(each)}
                    >
                      {each.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-lg-grow-1">{RenderCondition()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookshelves;
