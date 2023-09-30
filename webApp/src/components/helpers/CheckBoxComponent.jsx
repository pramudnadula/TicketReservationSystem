import React from 'react';

export default function CheckBoxComponent({
  label,
  name,
  inputHandler,
  checked,
  labelClasses = "form-check-label",
}) {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={name}
        checked={checked}
        onChange={(e) => inputHandler(e.target.checked)}
      />
      {label && (
        <label
          className={`capitalize ${labelClasses}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
    </div>
  );
}
