const trimNumber = number => {
  if (number / 1000000 >= 1) {
    let result = (number / 1000000).toFixed(2);

    if (result.endsWith('0')) {
      result = result.slice(0, -1);
    }

    return `${result}M`;
  }

  if (number / 1000 >= 1) {
    return `${Math.floor(number / 1000)}K`;
  }

  return number;
};

export default trimNumber;
