import React from "react";
import Spinner from "react-bootstrap/Spinner";
import useFetch from "use-http";
import { correctActionsURL } from "../../Service/service";
import { useLocation } from "react-router-dom";
import NonConformCard from "../NonConformBody/NonConformCard";

const SingleNonConform = () => {
  const location = useLocation();
  const { nonConform } = location.state;
  //fetching the corrective actions
  const {
    data: actions = [],
    loading: loadingAction,
    error: errActions,
  } = useFetch(correctActionsURL, []);

  return (
    <section className="conteudo">
      {loadingAction && <Spinner animation="border" />}
      {errActions && "Error!"}
      <NonConformCard
        key={nonConform.id}
        occurenceDate={nonConform.date}
        description={nonConform.description}
        departments={nonConform.departments}
      ></NonConformCard>
    </section>
  );
};

export default SingleNonConform;
