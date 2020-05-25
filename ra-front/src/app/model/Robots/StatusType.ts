export class StatusType {
  id: string;
  name: string;
  description: string;
  symbol: string;


  constructor(id: string, name: string, description: string, symbol: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.symbol = symbol;
  }
}
