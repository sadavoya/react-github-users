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
  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        remaining === 0 && console.log("0 requests remaining!");
      })
      .catch((err) => console.log(err));
  };
  const loadData = () => {
    checkRequests();
  };
  // error
  useEffect(loadData, []);
  const [github, setGithub] = useState({
    user: githubUser,
    repos,
    followers,
    requests,
  });

  return (
    <GithubContext.Provider value={github}>{children}</GithubContext.Provider>
  );
};
export { GithubContext, GithubProvider };
