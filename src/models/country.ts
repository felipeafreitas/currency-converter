export type Country = {
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  flag: string;
  name: {
    common: string;
  };
};
