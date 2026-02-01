import { getAllCategories } from "@/actions/category/category.action";
import CategoryManagement from "@/components/modules/category/CategoryManagement";

const CategoriesPage = async () => {
  const { data } = (await getAllCategories()) || [];
  console.log(data);
  return <div>{<CategoryManagement categories={data} />}</div>;
};

export default CategoriesPage;
