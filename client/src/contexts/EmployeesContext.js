import { createContext, useEffect, useState } from "react";

const employeesContext = createContext(null);
const Context1 = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3500/employee")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmployees(data.listWithDepartment);
      })
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3500/department")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data.list);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <employeesContext.Provider
      value={{ employees, setEmployees, departments, setDepartments }}
    >
      {children}
    </employeesContext.Provider>
  );
};
export { Context1, employeesContext };
