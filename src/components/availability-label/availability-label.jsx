import React from "react";
import PropTypes from "prop-types";
import Check from "./check";
import Link from "../utils/link";

/**
 * Availability label component props.
 *
 * @export
 * @param {object} props
 * @param {string} props.manifestText
 * @param {string} props.availabilityText
 * isCurrentlyActive should be a state that is passed down to the component
 * @param {string} props.state
 * @param {string} props.url
 * @returns {ReactNode}
 */
const AvailabilityLabel = ({ manifestText, availabilityText, state, link }) => {
  function availableClass(isAvailable) {
    return isAvailable !== "unavailable" ? "success" : "alert";
  }

  function selectedClass(isActive) {
    return isActive === "selected" ? "selected" : "unselected";
  }

  function selectedClassTriangle(isActive) {
    return isActive === "selected" ? "none" : "xsmall";
  }

  function checkIconClasses(isActive) {
    return isActive === "selected" ? "check-icon selected" : "check-icon";
  }

  const availabilityLabel = (
    <div
      className={`pagefold-parent--${selectedClassTriangle(
        state
      )} availability-label--${selectedClass(state)} text-label`}
    >
      <div
        className={`pagefold-triangle--${selectedClassTriangle(
          state
        )} ${availableClass(state)}`}
      />
      {/* this Check comp is not the final solution. We are going with it for now,
        because dpl-design-system is not yet ready as a library
        - check.jsx file will then be deleted as well */}
      <Check classes={checkIconClasses(state)} />
      <p className="text-label-semibold ml-24">{manifestText}</p>
      <div className="availability-label--divider ml-4" />
      <p className="text-label-normal ml-4 mr-8">{availabilityText}</p>
    </div>
  );

  return link ? (
    <Link href={link} newTab>
      {availabilityLabel}
    </Link>
  ) : (
    availabilityLabel
  );
};

AvailabilityLabel.propTypes = {
  manifestText: PropTypes.string.isRequired,
  availabilityText: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  link: PropTypes.string
};

AvailabilityLabel.defaultProps = {
  link: undefined
};

export default AvailabilityLabel;
