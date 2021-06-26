import React from "react";
import style from "./Feed.module.css";
import {
  departURLS,
  getDeptsName,
  naoConformsURL,
} from "../../Service/service";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import useFetch from "use-http";
import NonConformCard from "../NonConformBody/NonConformCard";
import { Link } from "react-router-dom";

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
    <main className={style.feed + ` conteudo`}>
      {(loading || loadingDpt) && <Spinner animation="border" />}
      {(error || errDpt) && "Error!"}
      {data.map((el) => {
        const departmentsStr = getDeptsName(depts, el.departments);
        return (
          <NonConformCard
            key={el.id}
            occurenceDate={el["ocurrence-date"]}
            description={el.description}
            departments={departmentsStr}
          >
            <Link
              to={{
                pathname: `/nao-conformidade/${el.id}`,
                state: {
                  nonConform: {
                    id: el.id,
                    date: el["ocurrence-date"],
                    description: el.description,
                    departments: departmentsStr,
                    departmentsArr: el.departments,
                    actions: el["corrective-actions"],
                  },
                },
              }}
            >
              <Button variant="primary">Ver mais</Button>
            </Link>
          </NonConformCard>
        );
      })}
    </main>
  );
};

export default Feed;
