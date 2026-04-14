import { getAllCategories } from "@/actions/category/category.action";
import CategoryManagement from "@/components/modules/category/CategoryManagement";

export const metadata = {
  title: "Categories - SkillBridge",
  description: "Categories - SkillBridge",
};

const CategoriesPage = async () => {
  const { data } = (await getAllCategories()) || [];
  return <div>{<CategoryManagement categories={data} />}</div>;
};

export default CategoriesPage;
