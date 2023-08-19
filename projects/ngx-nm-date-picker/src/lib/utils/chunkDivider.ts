export const divideIntoChunks = <T>(itemArray: T[], numberOfRows: number, numberOfItems: number) => {
  const rows: T[][] = [];
  for (let i = 0; i < numberOfRows; i++) {
    const range = itemArray.slice(i * numberOfItems, i * numberOfItems + numberOfItems);
    rows.push(range);
  }
  return rows;
};
