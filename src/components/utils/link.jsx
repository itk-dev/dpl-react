import React from "react";
import PropTypes from "prop-types";
/**
 * Link component props.
 *
 * @export
 * @param {object} props
 * @param {string} props.url
 * @param {boolean} props.isNewTab
 * @returns {ReactNode}
 */
const Link = ({ href, children, isNewTab }) => {
  return (
    <a href={href} target={isNewTab ? "_blank" : ""} className="hide-linkstyle">
      {children}
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.element,
  isNewTab: PropTypes.bool
};

Link.defaultProps = {
  href: undefined,
  children: undefined,
  isNewTab: undefined
};

export default Link;
