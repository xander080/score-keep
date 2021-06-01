import React from "react";
import propTypes from "prop-types";

const TitleBar = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

TitleBar.propTypes = {
  title: React.propTypes.string.isRequired,
};

TitleBar.defaultProps = {
  title: "Default Title",
};
export default TitleBar;
