import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import AlertDialogExample from "./AlertDialogExample";
import { Button, Input, Select, Alert, AlertIcon } from "@chakra-ui/react";
const Employees = ({ departments }) => {
  const [employees, setEmployees] = useState([]);
  const [editRow, setEditRow] = useState(-1);
  const [alertUpdate, setAlertUpdate] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
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
      .then((res) => {
        setAlertDelete(true);
        setTimeout(() => setAlertDelete(false), 2000);
      })
      .catch((err) => alert(err.message));
  };
  const handleEdit = (e, i) => {
    const id = departments.find((dep) => dep.name === e.departementName)._id;
    setEmployee({
      name: e.name,
      surname: e.surname,
      departementId: id,
    });
    setEditRow(i);
  };
  const handleDepartmentId = (e) => {
    const id = departments.find((dep) => dep.name === e.target.value)._id;
    setEmployee((prev) => ({
      ...prev,
      departementId: id,
    }));
  };
  const updateEmployee = (id) => {
    axios
      .put(`http://localhost:3500/employee/${id}`, employee)
      .then((res) => {
        setAlertUpdate(true);
        setTimeout(() => setAlertUpdate(false), 2000);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="employees">
      {alertDelete && (
        <Alert
          status="warning"
          style={{ width: "80%", margin: "1% 5% 1% 5% " }}
        >
          <AlertIcon />
          employee deleted successfully
        </Alert>
      )}
      {alertUpdate && (
        <Alert
          status="success"
          style={{ width: "80%", margin: "1% 5% 1% 5% " }}
        >
          <AlertIcon />
          updated successfully
        </Alert>
      )}
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
                    <Input
                      defaultValue={e.name}
                      onChange={(event) =>
                        setEmployee((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                    />
                  ) : (
                    <span>{e.name}</span>
                  )}
                </td>
                <td>
                  {editRow === i ? (
                    <Input
                      defaultValue={e.surname}
                      onChange={(event) =>
                        setEmployee((prev) => ({
                          ...prev,
                          surname: event.target.value,
                        }))
                      }
                    />
                  ) : (
                    <span>{e.surname}</span>
                  )}
                </td>
                <td>
                  {editRow === i ? (
                    <Select
                      defaultValue={e.departementName}
                      onChange={handleDepartmentId}
                    >
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
                  <AlertDialogExample
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
                  <button onClick={() => handleEdit(e, i)}>
                    <EditIcon />
                  </button>
                  <Button onClick={() => updateEmployee(e.id)}>
                    Save Update
                  </Button>
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
