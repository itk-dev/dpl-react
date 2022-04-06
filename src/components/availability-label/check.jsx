import React from "react";
import PropTypes from "prop-types";

/**
 * Availability label component props.
 *
 * @export
 * @param {object} props
 * @param {string} props.classes
 * @returns {ReactNode}
 */
function Check({ classes }) {
  return (
    <svg
      className={classes}
      height="14px"
      width="14px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4489 5.49129C20.7299 5.18693 21.2043 5.16795 21.5087 5.4489C21.7854 5.70431 21.8262 6.11968 21.6203 6.42176L21.5511 6.50871L9.5511 19.5087C9.28844 19.7933 8.85853 19.8273 8.55624 19.6048L8.46967 19.5303L2.46967 13.5303C2.17678 13.2374 2.17678 12.7626 2.46967 12.4697C2.73594 12.2034 3.1526 12.1792 3.44621 12.3971L3.53033 12.4697L8.978 17.917L20.4489 5.49129Z"
        fill="black"
      />
    </svg>
  );
}

Check.propTypes = {
  classes: PropTypes.string.isRequired
};

export default Check;
