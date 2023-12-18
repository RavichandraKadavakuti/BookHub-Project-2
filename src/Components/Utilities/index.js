import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

export const InitialFetchAPiState = {
  INITIAL: "Initial",
  SUCCESS: "Success",
  FAILURE: "Failure",
  INPROGRESS: "Inprogress",
};

export const BookshelvesValue = [
  {
    id: "22526c8e-680e-4419-a041-b05cc239ece4",
    value: "ALL",
    label: "All",
  },
  {
    id: "37e09397-fab2-46f4-9b9a-66b2324b2e22",
    value: "READ",
    label: "Read",
  },

  {
    id: "361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8",
    value: "WANT_TO_READ",
    label: "Want to Read",
  },
  {
    id: "2ab42512-3d05-4fba-8191-5122175b154e",
    value: "CURRENTLY_READING",
    label: "Currently Reading",
  },
];

let token = Cookies.get("jwt_token");

export const LoginApi = async (path, data) => {
  try {
    const url = `https://apis.ccbp.in/${path}`;
    const options = {
      method: "POST",
      body: JSON.stringify(data),
    };
    const req = await fetch(url, options);
    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.error_msg);
    }
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetMethodApiData = async (path) => {
  let token = Cookies.get("jwt_token");

  try {
    const url = `https://apis.ccbp.in/${path}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const req = await fetch(url, options);
    const res = await req.json();
    if (!req.ok) {
      throw new Error(res.error_msg);
    }
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const LoadingDataView = () => (
  <div className="d-flex justify-content-center">
    <ThreeDots color="blue" height={50} width={50} />
  </div>
);

export const FailureDataView = (msg) => (
  <div className="d-flex flex-column justify-content-center align-items-center text-center">
    <img
      src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674886994/Group_7737_ipxqpg.png"
      alt="failure"
      className="img-fluid mb-3"
    />
    <h6>Something went wrong, Please try again.</h6>
    <p>{msg}</p>
  </div>
);

export const SearchResultsNotFound = (msg) => (
  <div className="d-flex flex-column align-items-center text-center my-5">
    <img
      src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1700201346/Asset_1_1_bcas0r.png"
      alt="no results"
      className="img-fluid"
    />
    <p>
      Your search for <span className="text-danger">{msg}</span> did not find
      any matches.
    </p>
  </div>
);
