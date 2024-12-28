import { TypeTransactionEnums } from "../enum/typeTransaction";
import Category from "../model/categoryModel";

const categories = [
  { name: "Mercado", type: TypeTransactionEnums.Expense },
  { name: "Uber", type: TypeTransactionEnums.Expense },
  { name: "Internet", type: TypeTransactionEnums.Expense },
  { name: "Aluguel", type: TypeTransactionEnums.Expense },
  { name: "Netflix", type: TypeTransactionEnums.Expense },
  { name: "Salário", type: TypeTransactionEnums.Revenue },
  { name: "Freelancer", type: TypeTransactionEnums.Revenue },
  { name: "Investimento em Ações", type: TypeTransactionEnums.Invested },
  { name: "Investimento em CDB", type: TypeTransactionEnums.Invested },
];

export const seedData = async () => {
  try {
    for (const category of categories) {
      const categoryExists = await Category.findOne({ name: category.name });
      if (!categoryExists) {
        const newCategory = new Category(category);
        await newCategory.save();
      }
    }
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
