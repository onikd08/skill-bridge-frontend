import { getUser } from "@/actions/auth/auth.action";
import { getAllCategories } from "@/actions/category/category.action";
import TutorProfileForm from "@/components/modules/tutor/TutorProfileForm";
import tutorService from "@/services/tutor/tutor.service";

const TutorProfilePage = async () => {
  const categories = await getAllCategories();
  const userData = await getUser();
  const { data } = await tutorService.getTutorProfileByUserId();

  return (
    <div>
      <TutorProfileForm
        mode={data ? "update" : "create"}
        categories={categories.data ?? []}
        tutorProfile={data}
        user={userData}
      ></TutorProfileForm>
    </div>
  );
};

export default TutorProfilePage;
