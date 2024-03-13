import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const EmployeesByDep = () => {
  const location = useLocation();
  const list = location.state.departmentEmployees;

  return (
    <div className="departmentEmployees">
      <h3>
        Employees of <span>{location.state.targetDepartment.name} </span>
        department
      </h3>
      {list.map((e) => (
        <div key={e._id} className="name">
          <p>Name: {e.name}</p>
          <p>surname: {e.surname}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeesByDep;
