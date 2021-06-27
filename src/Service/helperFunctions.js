//funçoes para trabalhar com os dados

export const getDeptsName = (deptsArray, nonConformArray) =>
  deptsArray
    .filter((item) => nonConformArray.includes(item.id))
    .map((el) => el.name)
    .join(", ");

export const getCorrectActions = (actionsArray, nonConformArray) =>
  actionsArray.filter((item) => nonConformArray.includes(item.id));
