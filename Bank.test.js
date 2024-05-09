

const Bank = require('./Bank');

describe('Bank and BankAccount', () => {
    let bank;
    beforeEach(() => {
        bank = new Bank();
    });

    describe('BankAccount operations', () => {
        test('should deposit amount correctly', () => {
            const account = new Bank().createAccount('123', 100);
            expect(account.deposit(100)).toBe('Successfully deposited 100 into account 123.');
            expect(account.getBalance()).toBe('Current balance of account 123 is 200.');
        });

        test('should not deposit a negative amount', () => {
            const account = new Bank().createAccount('123', 100);
            expect(account.deposit(-50)).toBe('Invalid amount for deposit.');
        });

        test('should withdraw amount correctly', () => {
            const account = new Bank().createAccount('123', 200);
            expect(account.withdraw(100)).toBe('Successfully withdrew 100 from account 123.');
            expect(account.getBalance()).toBe('Current balance of account 123 is 100.');
        });

        test('should not withdraw a negative amount or more than balance', () => {
            const account = new Bank().createAccount('123', 100);
            expect(account.withdraw(-50)).toBe('Insufficient funds or invalid amount for withdrawal.');
            expect(account.withdraw(150)).toBe('Insufficient funds or invalid amount for withdrawal.');
        });

        test('should get transaction history', () => {
            const account = new Bank().createAccount('123', 100);
            account.deposit(50);
            account.withdraw(25);
            expect(account.getTransactionHistory()).toEqual([
                { type: 'deposit', amount: 50 },
                { type: 'withdrawal', amount: 25 }
            ]);
        });
    });

    describe('Bank operations', () => {
        test('should create a new account correctly', () => {
            expect(bank.createAccount('123', 100)).toBe('Account 123 created successfully.');
            expect(bank.getAccount('123').getBalance()).toBe('Current balance of account 123 is 100.');
        });

        test('should not create a duplicate account', () => {
            bank.createAccount('123', 100);
            expect(bank.createAccount('123', 200)).toBe('Account 123 already exists.');
        });

        test('should close an account correctly', () => {
            bank.createAccount('123', 100);
            expect(bank.closeAccount('123')).toBe('Account 123 closed successfully.');
            expect(bank.getAccount('123')).toBe('Account 123 does not exist.');
        });

        test('should not close a non-existent account', () => {
            expect(bank.closeAccount('999')).toBe('Account 999 does not exist.');
        });

        test('should transfer funds correctly', () => {
            bank.createAccount('123', 300);
            bank.createAccount('456', 100);
            expect(bank.transferFunds('123', '456', 200)).toBe('Successfully transferred 200 from account 123 to account 456.');
            expect(bank.getAccount('123').getBalance()).toBe('Current balance of account 123 is 100.');
            expect(bank.getAccount('456').getBalance()).toBe('Current balance of account 456 is 300.');
        });

        test('should not transfer funds if insufficient balance or accounts do not exist', () => {
            bank.createAccount('123', 100);
            bank.createAccount('456', 100);
            expect(bank.transferFunds('123', '456', 200)).toBe('Failed to transfer funds. Insufficient funds or invalid amount for withdrawal.');
            expect(bank.transferFunds('123', '789', 50)).toBe('Failed to transfer funds. One or both accounts do not exist.');
        });
    });
});