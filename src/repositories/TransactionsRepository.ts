import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'income' ? acc + transaction.value : acc,
      0,
    );

    const outcome = this.transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'outcome' ? acc + transaction.value : acc,
      0,
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
