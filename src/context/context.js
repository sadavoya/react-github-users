import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const DEBUG = false;

const reposPerPage = 100;
const followersPerPage = 100;
const rootUrl = "https://api.github.com";
const userUrlBase = `${rootUrl}/users`;
const reposUrlSuffix = `?per_page=${reposPerPage}`;
const followersUrlSuffix = `?per_page=${followersPerPage}`;

const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [requests, setRequests] = useState({});
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // loading
  const [isLoading, setIsLoading] = useState(true);
  // error
  const [error, setError] = useState({ show: false, msg: "" });

  // The search function
  const searchGithubUser = async (user) => {
    // userUrl
    const userUrl = `${userUrlBase}/${user}`;
    // toggle error
    toggleError(false, "");
    setIsLoading(true);
    const response = await axios(userUrl).catch((err) => {
      setIsLoading(false);
      console.log(err);
    });
    DEBUG && console.log(response);
    if (response) {
      let { repos_url, followers_url } = response.data;
      repos_url += reposUrlSuffix;
      followers_url += followersUrlSuffix;

      DEBUG && console.log(repos_url, followers_url);
      setGithubUser(response.data);
      await Promise.allSettled([axios(followers_url), axios(repos_url)])
        .then((results) => {
          const [followers, repos] = results;
          const successStatus = "fulfilled";
          if (repos.status === successStatus) {
            setRepos(repos.value.data);
          }
          if (followers.status === successStatus) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));

      // more logic here
    } else {
      toggleError(true, "there is no user with that username");
    }
    checkRequests();
    setIsLoading(false);
  };

  // The function to determine check limit and remaining
  const checkRequests = () => {
    setIsLoading(true);
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { rate } = data;
        rate.remaining = rate.remaining;
        setRequests(rate);
        if (rate.remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        DEBUG && console.log(err);
      });
  };
  function toggleError(show, msg) {
    setError({ show, msg });
  }
  useEffect(checkRequests, []);
  // console.log(requests);
  return (
    <GithubContext.Provider
      value={{
        user: githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export { GithubContext, GithubProvider };
