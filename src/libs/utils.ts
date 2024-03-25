export function convertNumberToCurrency(num: number): string {
  var dotIndex = 3;
  const numArr = num.toString().split("").reverse();
  var tempArr = numArr;
  numArr.map((num, idx) => {
    if (idx === dotIndex) {
      if (tempArr.includes(".")) {
        tempArr = [
          ...tempArr.slice(0, dotIndex + 1),
          ".",
          ...tempArr.slice(dotIndex + 1, numArr.length + 1),
        ];
        dotIndex = dotIndex + 3;
        return;
      }
      tempArr = [
        ...tempArr.slice(0, dotIndex),
        ".",
        ...tempArr.slice(dotIndex, numArr.length),
      ];

      dotIndex = dotIndex + 3;
    }
  });
  return tempArr.reverse().join("");
}
