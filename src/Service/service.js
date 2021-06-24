//URLS
export const naoConformsURL = "http://localhost:3000/non-conformities";

export const departURLS = "http://localhost:3000/departments";

export const correctActionsURL = "http://localhost:3000/corrective-actions";
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
