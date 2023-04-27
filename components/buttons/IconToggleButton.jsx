import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../lib/functions";

export default function IconToggleButton({
  children,
  active,
  setActive,
  style,
}) {
  return (
    <button
      type="button"
      onClick={() => setActive(!active)}
      style={style}
      className={classNames(
        active ? "bg-gray-400 text-gray-900" : "bg-white text-gray-700",
        "rounded-md border-2 border-gray-800"
      )}
    >
      {children}
    </button>
  );
}

IconToggleButton.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};
