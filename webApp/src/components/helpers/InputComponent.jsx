import React from 'react';

export default function InputComponent({
  label,
  type,
  name,
  placeholder,
  children,
  inputHandler,
  value,
  inputClasses,
  labelClasses = "text-sm font-normal",
}) {
  return (
    <div className="form-group">
      {label && (
        <label
          className={`capitalize ${labelClasses || ""}`}
          htmlFor={name}
          style={{ color: "#7a25a5" }}
        >
          <b>{label}</b>
        </label>
      )}
      <div className="input-wrapper">
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => inputHandler(e.target.value)}
          className={`form-control ${inputClasses || ""}`}
          type={type}
          id={name}
        />
        {children && children}
      </div>
    </div>
  );
}
