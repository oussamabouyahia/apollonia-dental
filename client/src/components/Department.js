import React from "react";

const Department = ({ name, staffCapacity, listByDep }) => {
  return (
    <article className="department">
      <h3> {name}</h3>
      <p>
        <span> Staff capacity: </span> {staffCapacity}
      </p>
      <button onClick={listByDep}>employees of this department</button>
    </article>
  );
};

export default Department;
