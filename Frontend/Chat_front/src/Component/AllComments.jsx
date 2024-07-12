// src/components/Comments.js
import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div className="p-4 mt-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-2">Comments</h3>
      {comments.map(comment => (
        <div key={comment.id} className="mb-4">
          <h4 className="font-bold">{comment?.friend[0].username}</h4>
          <p>{comment.comment}</p>
          <p className="text-sm text-gray-600">by {comment.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
