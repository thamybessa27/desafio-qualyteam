//URLS
export const naoConformsURL = "http://localhost:3000/non-conformities";

export const departURLS = "http://localhost:3000/departments";

export const correctActionsURL = "http://localhost:3000/corrective-actions";

//export const updateNonComformAction = ;
//Funcoes assíncronas para trabalhar com a API

export async function getNaoConforms() {
  const response = await fetch(naoConformsURL);
  if (!response.ok) {
    throw new Error(`Erro HTTP! status: ${response.status}`);
  }
  const json = response.json();
  return json;
}

//funçoes

export const getDeptsName = (deptsArray, nonConformArray) =>
  deptsArray
    .filter((item) => nonConformArray.includes(item.id))
    .map((el) => el.name)
    .join(", ");

export const getCorrectActions = (actionsArray, nonConformArray) =>
  actionsArray.filter((item) => nonConformArray.includes(item.id));

//atualiza a não-conformidade com a ação corretiva recem postada
export const updateNonConformWithAction = (id, body) => {
  fetch(`http://localhost:3000/non-conformities/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
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
      headers: { "content-type": "application/json" },
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
