import BuyBox from '../src/entities/buy-box'

interface EntityContract {
  get (key: string): any;
  set (key: string, value: any): void;
  toJSON (): Object;
  toString (): string;
}

interface ParserContract {
  static render (content: string): EntityContract;
}

interface CrawlerDriverContract {
  name: string;
  base: string;

  buyBox (uid: string): Promise<BuyBox>;
}

type Price = { amount: number, currency: string }

interface StorageDriver {
  connect();

  insert (table: string, data: Array | Object);
}
