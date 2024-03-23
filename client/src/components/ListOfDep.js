import React from "react";
import Department from "./Department";
import { useNavigate } from "react-router-dom";
import { employeesContext } from "../contexts/EmployeesContext";

const ListOfDep = () => {
  const navigate = useNavigate();
  const { departments } = React.useContext(employeesContext);
  const listByDep = (id) => {
    fetch(`http://localhost:3500/department/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/employees", { state: data });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <h1
        style={{
          color: "ActiveCaption",
          textDecoration: "underline",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        Our Departments
      </h1>
      <div className="departments">
        {departments.lengt === 0 ? (
          <p>loading...</p>
        ) : (
          departments.map((e) => (
            <div key={e._id}>
              <Department
                name={e.name}
                staffCapacity={e.staffCapacity}
                listByDep={() => {
                  listByDep(e._id);
                }}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListOfDep;
