import { useState } from "react";

export default function CommentAvatar(props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ width: "70px", height: "70px" }}>
      <img
        src={props.avatarUrl}
        alt="avatar"
        width={props.width}
        height={props.height}
        className="comment-avatar"
        style={{
          display: loaded ? "block" : "none",
          opacity: loaded ? "100%" : "0%",
          animation: "fade-in 0.25s linear",
        }}
        onLoad={() => {
          setLoaded(true);
        }}
      />
      <div
        style={{
          display: !loaded ? "block" : "none",
          width: props.width + "px",
          height: props.height + "px",
        }}
        className="loader"
      ></div>
    </div>
  );
}
