import "./App.css";
import ListOfDep from "./components/ListOfDep";
import EmployeesByDep from "./components/EmployeesByDep";

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <h1>Apollonia Dental Clinic</h1>
          <Routes>
            <Route path="/" element={<ListOfDep />} />
            <Route path="/employees" element={<EmployeesByDep />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
