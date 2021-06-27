//Funcoes assíncronas para trabalhar com a API

import { correctActionsURL, naoConformsURL } from "./urls";

const headers = { "content-type": "application/json" };
export async function getNaoConforms() {
  const response = await fetch(naoConformsURL);
  if (!response.ok) {
    throw new Error(`Erro HTTP! status: ${response.status}`);
  }
  const json = response.json();
  return json;
}

//atualiza a não-conformidade com a ação corretiva recem postada
export const updateNonConformWithAction = (id, body) => {
  fetch(`${naoConformsURL}/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      id: body.id,
      description: body.description,
      "ocurrence-date": body.date,
      departments: body.departments,
      "corrective-actions": body.actions,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => new Error(`Erro: ${err}`));
};

//adiciona nova ação corretiva no backend e retorna o id dessa açao adicionada
export const addNewCorrectiveAction = async (body) => {
  try {
    const response = await fetch(correctActionsURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        "what-to-do": body.what,
        "why-to-do-it": body.why,
        "how-to-do-it": body.how,
        "where-to-do-it": body.where,
        "until-when": body.date,
      }),
    });
    const data = await response.json();
    console.log("nova açao postada: ", data);
    return data.id;
  } catch (err) {
    return new Error(`Erro: ${err}`);
  }
};

//adiciona nova não-conformidade no backend
export const addNewNonConformity = async (body) => {
  try {
    const response = await fetch(naoConformsURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        description: body.description,
        "ocurrence-date": body.date,
        departments: body.departments,
        "corrective-actions": body.actions,
      }),
    });
    const data = await response.json();
    console.log("nova nao conform:", data);
  } catch (err) {
    return new Error(`Erro: ${err}`);
  }
};
