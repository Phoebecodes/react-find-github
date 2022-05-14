import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { useContext } from "react";

const rootUrl = "https://api.github.com";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [error, setError] = useState({ show: false, msg: "" });

  const getRequest = async () => {
    try {
      const response = await axios(`${rootUrl}/rate_limit`);
      const data = await response.data;
      const remaining = data.resources.core.remaining;
      if (remaining === 0) {
        setError({
          show: true,
          msg: "Sorry, you have exceeded the hourly rate limit!",
        });
      }

      setRequest(remaining);

      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);
  const getUser = async (user) => {
    setLoading(true);
    setError({ show: false, msg: "" });
    // setError({ show: false, msg: "" });

    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      const data = await response.data;
      setGithubUser(data);
      const { login, followers_url } = data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setError({ show: true, msg: "There is no user found!" });
    }
    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        loading,
        user,
        setUser,
        error,
        getUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
