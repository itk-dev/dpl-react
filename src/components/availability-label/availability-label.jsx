import React from "react";
import PropTypes from "prop-types";
import Check from "@reload/dpl-design-system/build/icons/collection/Check.svg";
import clsx from "clsx";
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
  const triangleState = {
    available: "success",
    unavailable: "alert",
    selected: "alert"
  };

  const classes = {
    parent: clsx(
      {
        "pagefold-parent--none availability-label availability-label--selected":
          state === "selected"
      },
      {
        "pagefold-parent--xsmall availability-label availability-label--unselected":
          state !== "selected"
      },
      "text-label"
    ),
    triangle: clsx(
      { "pagefold-triangle--none": state === "selected" },
      {
        [`pagefold-triangle--xsmall pagefold-triangle--xsmall--${triangleState[state]}`]:
          state !== "selected"
      }
    ),
    check: clsx("availability-label--check", [`${state}`])
  };

  const availabilityLabel = (
    <div className={classes.parent}>
      <div className={classes.triangle} />
      <img className={classes.check} src={Check} alt="check-icon" />
      <p className="text-label-semibold ml-24">{manifestText}</p>
      <div className="availability-label--divider ml-4" />
      <p className="text-label-normal ml-4 mr-8">{availabilityText}</p>
    </div>
  );

  return link ? (
    <Link href={link} isNewTab>
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
