import React from "react";
import PropTypes from "prop-types";
import Check from "@reload/dpl-design-system/build/icons/collection/Check.svg";

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

  function selectedClass(currentState) {
    return currentState === "selected" ? "selected" : "unselected";
  }

  function selectedClassTriangle(currentState) {
    return currentState === "selected" ? "none" : "xsmall";
  }

  function checkIconClasses(currentState) {
    return currentState === "selected" ? "selected" : "";
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
      <img
        className={`availability-label--check ${checkIconClasses(state)}`}
        src={Check}
        alt="check-icon"
      />
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
