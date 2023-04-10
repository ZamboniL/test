interface Transaction {
  id: number;
  date: string;
  product: string;
  price: string;
  seller: string;
  type: {
    id: 1 | 2 | 3 | 4;
    description: string;
    signal: "+" | "-";
  };
}
