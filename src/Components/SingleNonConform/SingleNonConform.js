import React from "react";
import Spinner from "react-bootstrap/Spinner";
import useFetch from "use-http";
import { correctActionsURL } from "../../Service/service";
import { useLocation } from "react-router-dom";
import NonConformCard from "../NonConformBody/NonConformCard";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import style from "./SingleNonConform.module.css";
import FormCorrectAction from "../FormCorrectAction/FormCorrectAction";

const SingleNonConform = () => {
  //getting the props
  const location = useLocation();
  const { nonConform } = location.state;
  // console.log("vindo do feed:", nonConform);

  const [addedAction, setAddedAction] = React.useState([...nonConform.actions]);
  // console.log("via props", nonConform.actions, "estado:", addedAction);
  //fetching the corrective actions
  const {
    data: actions = [],
    loading: loadingAction,
    error: errActions,
  } = useFetch(correctActionsURL, []);

  // console.log("pos action fetch", actions);
  const [visible, setVisible] = React.useState(false);

  const showAddNewAction = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <section className="conteudo">
      {loadingAction && <Spinner animation="border" />}
      {errActions && <span>Erro: {errActions}</span>}
      {!errActions && !loadingAction && (
        <CardDeck>
          <NonConformCard
            key={nonConform.id}
            occurenceDate={nonConform.date}
            description={nonConform.description}
            departments={nonConform.departments}
          >
            <CustomAccordion
              allActions={actions}
              nonConfomActions={addedAction}
            />
            <Button
              variant="primary"
              className={style.btnCustom}
              onClick={showAddNewAction}
            >
              Adicionar ação corretiva
            </Button>{" "}
          </NonConformCard>
          {visible && (
            <FormCorrectAction
              originalData={nonConform}
              setAddedAction={setAddedAction}
              addedAction={addedAction}
            />
          )}
        </CardDeck>
      )}
    </section>
  );
};

export default SingleNonConform;
