import "./App.css";
import { useState, useEffect, useContext } from "react";
import ListOfDep from "./components/ListOfDep";
import EmployeesByDep from "./components/EmployeesByDep";
import Employees from "./components/Employees";
import NewEmployee from "./components/NewEmployee";
import Menu from "./components/Menu";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import { employeesContext } from "./contexts/EmployeesContext";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Menu />

          <Routes>
            <Route path="/" element={<ListOfDep />} />
            <Route path="/employees" element={<EmployeesByDep />} />
            <Route path="/list" element={<Employees />} />
            <Route path="/new" element={<NewEmployee />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
