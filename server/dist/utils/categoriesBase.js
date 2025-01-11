"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesBase = void 0;
const typeTransaction_1 = require("../enum/typeTransaction");
exports.categoriesBase = [
    { name: "Mercado", type: typeTransaction_1.TypeTransactionEnums.Expense, icon: "Store" },
    { name: "Uber", type: typeTransaction_1.TypeTransactionEnums.Expense, icon: "Car" },
    { name: "Internet", type: typeTransaction_1.TypeTransactionEnums.Expense, icon: "Globe" },
    { name: "Aluguel", type: typeTransaction_1.TypeTransactionEnums.Expense, icon: "Home" },
    { name: "Netflix", type: typeTransaction_1.TypeTransactionEnums.Expense, icon: "Clapperboard" },
    { name: "Salário", type: typeTransaction_1.TypeTransactionEnums.Revenue, icon: "Banknote" },
    { name: "Freelancer", type: typeTransaction_1.TypeTransactionEnums.Revenue, icon: "HandCoins" },
    {
        name: "Investimento em Ações",
        type: typeTransaction_1.TypeTransactionEnums.Invested,
        icon: "Activity",
    },
    {
        name: "Investimento em CDB",
        type: typeTransaction_1.TypeTransactionEnums.Invested,
        icon: "Activity",
    },
];
