import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import useFetch from "use-http";
import { getCorrectActions } from "../../Service/helperFunctions";
import { correctActionsURL } from "../../Service/urls";
import style from "./CustomAccordion.module.css";
import moment from "moment";

const CustomAccordion = ({ allActions, nonConfomActions }) => {
  const [actions, setActions] = React.useState(() => {
    const fetchedActions = getCorrectActions(allActions, nonConfomActions);
    return [...fetchedActions];
  });
  const {
    get,
    response,
    cache,
    loading: loadingAction,
    error: errActions,
  } = useFetch(correctActionsURL);

  React.useEffect(() => {
    (async function () {
      cache.clear();
      const result = await get();
      if (response.ok) {
        console.log("res:", response.data);
        const fetchedActions = getCorrectActions(result, nonConfomActions);
        return setActions([...fetchedActions]);
      }
    })();
  }, [nonConfomActions, get, response, cache]);

  return (
    <Accordion>
      {loadingAction && <Spinner animation="border" />}
      {errActions && <span>Erro: {errActions}</span>}
      {!errActions && !loadingAction && (
        <Card>
          {actions.map((el, index) => {
            return (
              <React.Fragment key={index}>
                <Accordion.Toggle
                  eventKey={el.id}
                  as={Card.Header}
                  variant="light"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <Card.Text>Ação corretiva: #{index + 1}</Card.Text>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={el.id}>
                  <Card.Body>
                    <ul className={style.list}>
                      <li>What to do: {el["what-to-do"]}</li>
                      <li>Why to do it: {el["why-to-do-it"]}</li>
                      <li>How to do it: {el["how-to-do-it"]}</li>
                      <li>Where to do it: {el["where-to-do-it"]}</li>
                      <li>
                        Until when:{" "}
                        {moment(el["until-when"], "DD-MM-YYYY").format(
                          "MMMM Do YYYY"
                        )}
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </React.Fragment>
            );
          })}
        </Card>
      )}
    </Accordion>
  );
};

export default CustomAccordion;
