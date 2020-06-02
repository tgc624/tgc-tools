const sort = <T>(target: keyof T) => (array: T[]) =>
  [...array].sort((ele1, ele2) => (ele1[target] > ele2[target] ? 1 : -1));

export const sortByOrder = sort("order");
export const sortByPosition = sort("position");
