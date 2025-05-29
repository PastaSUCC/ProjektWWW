import { useState } from "react";
function Checkbox({ label, id, checked, onChange }) {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          required
        />
        <span className="custom-checkbox"></span>
        <span className="checkbox-label">{label}</span>
      </label>
    </div>
  );
}
export default Checkbox;