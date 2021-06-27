import moment from "moment";
//funçoes para trabalhar com os dados

//funções puras
export const getDeptsName = (deptsArray, nonConformArray) =>
  deptsArray
    .filter((item) => nonConformArray.includes(item.id))
    .map((el) => el.name)
    .join(", ");

export const getCorrectActions = (actionsArray, nonConformArray) =>
  actionsArray.filter((item) => nonConformArray.includes(item.id));

//funções com efeitos colaterais

//modifica o array original
export const sortByDate = (nonConformArr) => {
  return nonConformArr.sort((a, b) => {
    return moment(a["ocurrence-date"], "DD-MM-YYY") <
      moment(b["ocurrence-date"], "DD-MM-YYY")
      ? 1
      : -1;
  });
};
