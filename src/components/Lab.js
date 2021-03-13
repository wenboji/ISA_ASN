import React from 'react';
import { useParams } from 'react-router-dom';

export const Lab = () => {
  const { labNum } = useParams();
  return <div>{labNum}</div>;
};
