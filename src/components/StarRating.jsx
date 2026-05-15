import { useState } from "react";

export default function StarRating({ note, editable = false, onChange }) {
  const [hovered, setHovered] = useState(0);
  const displayed = hovered || note;

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= displayed;
        const half = !filled && star - 0.5 <= displayed;
        return (
          <span
            key={star}
            className={`star ${filled ? "full" : half ? "half" : "empty"} ${editable ? "editable" : ""}`}
            onMouseEnter={() => editable && setHovered(star)}
            onMouseLeave={() => editable && setHovered(0)}
            onClick={() => editable && onChange && onChange(star)}
            role={editable ? "button" : undefined}
          >
            ★
          </span>
        );
      })}
      <span className="note-value">{note.toFixed(1)}</span>
    </div>
  );
}
