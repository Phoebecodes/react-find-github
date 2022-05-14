import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useGlobalContext();

  let languages = repos.reduce((total, item) => {
    const { language } = item;
    if (!language) {
      return total;
    }
    if (!total[language]) {
      total[language] = { label: language, value: 1 };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
      };
    }

    return total;
  }, {});

  languages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  let stars = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) {
      return total;
    }
    if (!total[language]) {
      total[language] = { label: language, value: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + stargazers_count,
      };
    }
    return total;
  }, {});

  stars = Object.values(stars)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  let popularRepos = repos.reduce((total, item) => {
    const { name, stargazers_count } = item;
    total[name] = { label: name, value: stargazers_count };
    return total;
  }, {});

  popularRepos = Object.values(popularRepos)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  let mostForked = repos.reduce((total, item) => {
    const { name, forks_count } = item;
    total[name] = { label: name, value: forks_count };
    return total;
  }, {});

  mostForked = Object.values(mostForked)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  console.log(popularRepos);

  const chartData = [
    {
      label: "html",
      value: "13",
    },
    {
      label: "css",
      value: "17",
    },
    {
      label: "Javascript",
      value: "30",
    },
  ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={languages} />
        <Column3D data={popularRepos} />
        <Doughnut2D data={stars} />
        <Bar3D data={mostForked} />
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
