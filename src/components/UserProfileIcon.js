import { CircleUser } from "lucide-react";

export default function UserProfileIcon({
  imageUrl,
  size = 40,
  className,
  color,
  style,
}) {
  return (
    <div
      className="profile-container"
      style={{ display: "inline-block", ...style }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="User Profile"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <CircleUser size={size} color={color} />
      )}
    </div>
  );
}
