import Category, { CategoryType } from "../model/categoryModel";

const categories = [
  { name: "Mercado", type: CategoryType.Expense },
  { name: "Uber", type: CategoryType.Expense },
  { name: "Internet", type: CategoryType.Expense },
  { name: "Aluguel", type: CategoryType.Expense },
  { name: "Netflix", type: CategoryType.Expense },
  { name: "Salário", type: CategoryType.Revenue },
  { name: "Freelancer", type: CategoryType.Revenue },
  { name: "Investimento em Ações", type: CategoryType.Invested },
  { name: "Investimento em CDB", type: CategoryType.Invested },
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
