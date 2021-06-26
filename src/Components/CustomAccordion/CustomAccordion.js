import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { getCorrectActions, correctActionsURL } from "../../Service/service";
import useFetch from "use-http";
import style from "./CustomAccordion.module.css";

const CustomAccordion = ({ allActions, nonConfomActions }) => {
  const [actions, setActions] = React.useState(() => {
    const fetchedActions = getCorrectActions(allActions, nonConfomActions);
    console.log(
      "no accordion",
      nonConfomActions,
      fetchedActions,
      "alla actions",
      allActions
    );
    return [...fetchedActions];
  });
  const {
    data = [],
    loading: loadingAction,
    error: errActions,
  } = useFetch(correctActionsURL, [nonConfomActions]);
  //console.log("data", data);

  React.useEffect(() => {
    setActions(() => {
      const fetchedActions = getCorrectActions(data, nonConfomActions);
      console.log(
        "no accordion",
        nonConfomActions,
        fetchedActions,
        "data",
        data
      );
      return [...fetchedActions];
    });
  }, [data]);

  // setActions(() => {
  //   const fetchedActions = getCorrectActions(allActions, nonConfomActions);
  //   console.log(
  //     "no accordion",
  //     nonConfomActions,
  //     fetchedActions,
  //     "alla actions",
  //     allActions
  //   );
  //   return [...fetchedActions];
  // });

  // React.useEffect(() => {}, [allActions, nonConfomActions]);

  return (
    <Accordion>
      <Card>
        {console.log("action no map", actions)}
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
                <Card.Text>Ação corretiva: {el.id}</Card.Text>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={el.id}>
                <Card.Body>
                  <ul className={style.list}>
                    <li>What to do: {el["what-to-do"]}</li>
                    <li>Why to do it: {el["why-to-do-it"]}</li>
                    <li>How to do it: {el["how-to-do-it"]}</li>
                    <li>Where to do it: {el["where-to-do-it"]}</li>
                    <li>Until when: {el["until-when"]}</li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </React.Fragment>
          );
        })}
      </Card>
    </Accordion>
  );
};

export default CustomAccordion;
