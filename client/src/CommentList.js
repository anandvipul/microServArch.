import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = Object.values(comments).map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "Being Moderated";
    }
    if (comment.status === "rejected") {
      content = "Has been Rejected";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
