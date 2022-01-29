export const getDehubPrice = async (): Promise<string> => {
  const json = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=dehub&vs_currencies=usd'
  );
  const price = await json.json();

  return price.dehub.usd;
};

export default getDehubPrice;
