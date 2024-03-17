import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import Alert from "./Alert";
const NewEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDep, setSelectedDep] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  useEffect(() => {
    fetch("http://localhost:3500/department")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data.list);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const addEmployee = () => {
    const departementId = departments.find((e) => e.name === selectedDep)?._id;

    axios
      .post("http://localhost:3500/employee", {
        name,
        surname,
        departementId,
      })
      .then((res) => {
        alert(res.data.message);
        setName("");
        setSurname("");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="addEmployee">
      <h2>Add a new Employee</h2>
      <FormControl isRequired>
        <FormLabel className="formlabel">Name</FormLabel>
        <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <FormLabel className="formlabel">Surname</FormLabel>
        <Input
          placeholder="Surname"
          onChange={(e) => setSurname(e.target.value)}
        />
        <FormLabel className="formlabel">Department</FormLabel>
        <Select
          placeholder="Select department"
          onChange={(e) => setSelectedDep(e.target.value)}
        >
          {departments.map((e) => (
            <option value={e.name} key={e._id}>
              {e.name}
            </option>
          ))}
        </Select>
        {/* <Button className="button" onClick={addEmployee}>
          {" "}
          Add Employee
        </Button> */}
        <Alert
          text="add Employee"
          action={addEmployee}
          flaseCondition={!selectedDep || !name || !surname}
        />
      </FormControl>
    </div>
  );
};

export default NewEmployee;
