import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
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
      {!employees.length ? (
        <h2>loading ....</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Department</th>
              <th>Delete</th>
              <th>Update</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, i) => (
              <tr
                key={e.id}
                style={{ backgroundColor: i % 2 === 0 ? "white" : "#adcfff" }}
              >
                <td> {e.name}</td>
                <td> {e.surname}</td>
                <td> {e.departementName}</td>
                <td>
                  <button>
                    <DeleteIcon />
                  </button>
                </td>
                <td>
                  <button>
                    <EditIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Employees;
