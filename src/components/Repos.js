import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  // Language to display when none provided
  const defaultLanguage = "(Not Specified)";
  const languageCount = 5;

  // Get the github data from the context
  const github = React.useContext(GithubContext);

  // get the top language counts
  let languages = getTopNLanguageCounts(
    github.repos,
    languageCount,
    defaultLanguage
  );
  // Sample Chart Data
  const chartData = [
    {
      label: "HTML",
      value: "13",
    },
    {
      label: "CSS",
      value: "23",
    },
    {
      label: "Javascript",
      value: "80",
    },
  ];

  const stars = chartData;
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={languages} />
        <div></div>
        <Doughnut2D data={stars} />
        <div></div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
// tally the repos by their languages and return the top entries
function getTopNLanguageCounts(repos, numberOfLanguages, defaultLanguage) {
  let languages = repos.reduce((total, item) => {
    // Destructure the repo data
    let { language } = item;
    // Ensure we have a language
    language = language || defaultLanguage;
    // Initialize the language
    total[language] = total[language] || { label: language, value: 0 };
    // Increment the language count
    total[language] = { ...total[language], value: total[language].value + 1 };
    return total;
  }, {});
  // Convert langages object to an array of label/value pairs...
  languages = Object.values(languages)
    .sort((a, b) => b.value - a.value) //...and sort by value DESC
    .slice(0, numberOfLanguages); //...and get the top entries
  // Debug
  // console.log(languages);
  return languages;
}
