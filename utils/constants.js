const queries = {
    createUsersTable:'CREATE TABLE IF NOT EXISTS "users" (userid serial primary key, username varchar, name varchar, email varchar)',
    createTransactionsTable:'CREATE TABLE if not exists "wallets" ( walletid serial primary key, userid int references users(userid), total_credit Numeric(10,2), total_debit Numeric(10,2), month int, year int, balance NUMERIC(10,2), timestamp timestamptz default now())',
    createWalletsTable:'CREATE TABLE if not exists "transactions" (transaction_id serial, userid int references users(userid), walletid int references wallets(walletid), transaction_code uuid, amount NUMERIC(10,2), mode varchar, timestamp timestamptz default now())',
    createUser: 'INSERT INTO users(username, name, email) values($1,$2,$3)',
    createTransaction: 'Insert into transactions (userid, amount, mode, walletid, timestamp) values($1,$2,$3,$4,$5)',
    createWalletEntry: 'Insert into wallets (userid) values($1)',
    getTransactionForUser: 'SELECT transaction_id, amount, mode, timestamp FROM transactions WHERE userid = $1',    
}

module.exports = queries;