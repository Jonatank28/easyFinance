import { seedDataCategories } from "./seedDataCategories";

export const seedData = async () => {
  await seedDataCategories();
};
