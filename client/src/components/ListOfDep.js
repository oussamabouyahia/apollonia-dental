import React from "react";
import Department from "./Department";
import { useNavigate } from "react-router-dom";

const ListOfDep = ({ departments }) => {
  const navigate = useNavigate();

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
  );
};

export default ListOfDep;
