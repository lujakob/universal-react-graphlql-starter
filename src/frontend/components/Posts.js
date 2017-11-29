import React from 'react';

const Posts = ({entries = []}) => {
  return (
    <div>
      {entries.map(entry => (
        <div key={entry.id}>{entry.title}</div>
      ))}
    </div>
  )
};

export default Posts;