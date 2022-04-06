import React from "react";
import PropTypes from "prop-types";
/**
 * Link component props.
 *
 * @export
 * @param {object} props
 * @param {string} props.url
 * @param {boolean} props.newTab
 * @returns {ReactNode}
 */
const Link = ({ href, children, newTab }) => {
  return (
    <a href={href} target={newTab ? "_blank" : ""} className="ddb-link">
      {children}
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.element,
  newTab: PropTypes.element
};

Link.defaultProps = {
  href: undefined,
  children: undefined,
  newTab: undefined
};

export default Link;
