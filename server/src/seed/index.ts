import { seedDataCategories } from "./seedDataCategories";
import { seedUserCategories } from "./seedUserCategories";

export const seedData = async () => {
  await seedDataCategories();
  await seedUserCategories();
};
