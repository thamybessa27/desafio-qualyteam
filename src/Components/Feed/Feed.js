import React from "react";
import {
  departURLS,
  getDeptsName,
  naoConformsURL,
} from "../../Service/service";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useFetch from "use-http";
import NonConformCard from "../NonConformBody/NonConformCard";

const Feed = () => {
  //fetching the non-conformities
  const { data = [], loading, error } = useFetch(naoConformsURL, []);
  //fetching the departments
  const {
    data: depts = [],
    loading: loadingDpt,
    error: errDpt,
  } = useFetch(departURLS, []);

  return (
    <main className="conteudo">
      {(loading || loadingDpt) && <Spinner animation="border" />}
      {(error || errDpt) && "Error!"}
      {data.map((el, index) => {
        return (
          <NonConformCard
            key={index}
            occurenceDate={el["ocurrence-date"]}
            description={el.description}
            departments={getDeptsName(depts, el.departments)}
          >
            <Button variant="primary">Ver mais</Button>
          </NonConformCard>
        );
      })}
    </main>
  );
};

export default Feed;
