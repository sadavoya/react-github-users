import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // error
  const [error, setError] = useState({ show: false, msg: "" });

  // request loading
  const [requests, setRequests] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { rate } = data;
        rate.remaining = rate.remaining;
        setRequests(rate);
        if (rate.remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit");
        }
      })
      .catch((err) => console.log(err));
  };
  function toggleError(show, msg) {
    setError({ show, msg });
  }
  useEffect(checkRequests, []);
  // console.log(requests);
  return (
    <GithubContext.Provider
      value={{ user: githubUser, repos, followers, requests, error }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export { GithubContext, GithubProvider };
