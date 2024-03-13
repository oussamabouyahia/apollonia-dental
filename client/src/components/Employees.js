import React, { useState, useEffect } from "react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3500/employee")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmployees(data.listWithDepartment);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="employees">
      <h3>list of employees</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Department</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td> {e.name}</td>
              <td> {e.surname}</td>
              <td> {e.departementName}</td>
              <td>
                <button>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
