import React from 'react';

export const Course = (props) => {
  return (
    <div className="course">
      <div>{props.courseNum + ' ' + props.courseName}</div>
      <ul>
        <li>lab1</li>
        <li>lab2</li>
        <li>lab3</li>
        <li>lab4</li>
        <li>lab5</li>
        <li>lab6</li>
      </ul>
    </div>
  );
};
