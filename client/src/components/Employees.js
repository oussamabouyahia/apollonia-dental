import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Alert from "./Alert";
import { Button, Input, Select } from "@chakra-ui/react";
const Employees = ({ departments }) => {
  const [employees, setEmployees] = useState([]);
  const [editRow, setEditRow] = useState(-1);
  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    departementId: "",
  });
  useEffect(() => {
    fetch("http://localhost:3500/employee")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmployees(data.listWithDepartment);
      })
      .catch((err) => console.log(err.message));
  }, []);
  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:3500/employee/${id}`)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
  };
  const updateEmployee = (id) => {};

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
            </tr>
          </thead>
          <tbody>
            {employees.map((e, i) => (
              <tr
                key={e.id}
                style={{ backgroundColor: i % 2 === 0 ? "white" : "#adcfff" }}
              >
                <td>
                  {editRow === i ? (
                    <Input defaultValue={e.name} />
                  ) : (
                    <span>{e.name}</span>
                  )}
                </td>
                <td>
                  {editRow === i ? (
                    <Input defaultValue={e.surname} />
                  ) : (
                    <span>{e.surname}</span>
                  )}
                </td>
                <td>
                  {editRow === i ? (
                    <Select defaultValue={e.departementName}>
                      {departments.map((el) => (
                        <option value={el.name} key={el._id}>
                          {el.name}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <span>{e.departementName}</span>
                  )}
                </td>
                <td
                  style={{
                    width: "10%",
                  }}
                >
                  <Alert
                    text={<DeleteIcon />}
                    action={() => deleteEmployee(e.id)}
                  />
                </td>
                <td
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <button onClick={() => setEditRow(i)}>
                    <EditIcon />
                  </button>
                  <Button>Save Update</Button>
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
