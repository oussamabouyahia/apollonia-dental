import "./App.css";
import { useState, useEffect } from "react";
import ListOfDep from "./components/ListOfDep";
import EmployeesByDep from "./components/EmployeesByDep";
import Employees from "./components/Employees";
import NewEmployee from "./components/NewEmployee";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
function App() {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3500/department")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data.list);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <h1>Apollonia Dental Clinic</h1>
          <Routes>
            <Route path="/" element={<ListOfDep departments={departments} />} />
            <Route path="/employees" element={<EmployeesByDep />} />
            <Route
              path="/list"
              element={<Employees departments={departments} />}
            />
            <Route path="/new" element={<NewEmployee />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
