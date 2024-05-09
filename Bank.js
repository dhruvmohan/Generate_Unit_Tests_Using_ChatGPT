class BankAccount {
    constructor(accountNumber, balance = 0) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.transactions = [];
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactions.push({ type: 'deposit', amount });
            return `Successfully deposited ${amount} into account ${this.accountNumber}.`;
        } else {
            return 'Invalid amount for deposit.';
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactions.push({ type: 'withdrawal', amount });
            return `Successfully withdrew ${amount} from account ${this.accountNumber}.`;
        } else {
            return 'Insufficient funds or invalid amount for withdrawal.';
        }
    }

    getBalance() {
        return `Current balance of account ${this.accountNumber} is ${this.balance}.`;
    }

    getTransactionHistory() {
        return this.transactions;
    }
}

class Bank {
    constructor() {
        this.accounts = new Map();
    }

    createAccount(accountNumber, initialBalance = 0) {
        if (!this.accounts.has(accountNumber)) {
            const newAccount = new BankAccount(accountNumber, initialBalance);
            this.accounts.set(accountNumber, newAccount);
            return `Account ${accountNumber} created successfully.`;
        } else {
            return `Account ${accountNumber} already exists.`;
        }
    }

    getAccount(accountNumber) {
        if (this.accounts.has(accountNumber)) {
            return this.accounts.get(accountNumber);
        } else {
            return `Account ${accountNumber} does not exist.`;
        }
    }

    closeAccount(accountNumber) {
        if (this.accounts.has(accountNumber)) {
            this.accounts.delete(accountNumber);
            return `Account ${accountNumber} closed successfully.`;
        } else {
            return `Account ${accountNumber} does not exist.`;
        }
    }

    transferFunds(fromAccount, toAccount, amount) {
        if (this.accounts.has(fromAccount) && this.accounts.has(toAccount)) {
            const from = this.accounts.get(fromAccount);
            const to = this.accounts.get(toAccount);
            const withdrawMsg = from.withdraw(amount);
            if (withdrawMsg.startsWith('Successfully')) {
                to.deposit(amount);
                return `Successfully transferred ${amount} from account ${fromAccount} to account ${toAccount}.`;
            } else {
                return 'Failed to transfer funds. Insufficient funds or invalid amount for withdrawal.';
            }
        } else {
            return 'Failed to transfer funds. One or both accounts do not exist.';
        }
    }
}


// Exporting the function to make it accessible in the test file
module.exports = Bank;