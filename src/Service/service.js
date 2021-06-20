//Funcoes assíncronas para trabalhar com a API

export async function getNaoConforms() {
  const response = await fetch(naoConformsURL);
  if (!response.ok) {
    throw new Error(`Erro HTTP! status: ${response.status}`);
  }
  const json = response.json();
  return json;
}
export const naoConformsURL = "http://localhost:3000/non-conformities";
