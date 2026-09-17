import { colorFromString, initialsOf } from "@/lib/format";

export default function Avatar({ name = "", size = 32 }) {
  return (
    <span
      className="avatar"
      style={{
        width: size,
        height: size,
        background: colorFromString(name),
        fontSize: Math.round(size * 0.38),
      }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  );
}
