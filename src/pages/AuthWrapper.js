import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loadingGif from "../images/preloader.gif";
import styled from "styled-components";
function AuthWrapper({ children }) {
  // Get the Auth0 data
  const { isLoading, error } = useAuth0();

  // If we are still loading...
  if (isLoading) {
    // ...show a spinner
    return (
      <Wrapper>
        <img src={loadingGif} alt="spinner" />
      </Wrapper>
    );
  }
  // If there is an error...
  if (error) {
    // ...display an error
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  // Otherwise, display the children
  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;
