import { getAllCategories } from "@/actions/category/category.action";
import TutorProfileForm from "@/components/modules/tutor/TutorProfileForm";
import tutorService from "@/services/tutor/tutor.service";

const TutorProfilePage = async () => {
  const { data } = await tutorService.getTutorProfile();
  const categories = await getAllCategories();

  return (
    <div>
      <TutorProfileForm
        mode={data ? "update" : "create"}
        categories={categories.data ?? []}
        tutorProfile={data}
      ></TutorProfileForm>
    </div>
  );
};

export default TutorProfilePage;
