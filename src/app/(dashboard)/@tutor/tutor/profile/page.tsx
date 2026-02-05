import { getAllCategories } from "@/actions/category/category.action";
import { getUserSession } from "@/actions/user/user.action";
import TutorProfileForm from "@/components/modules/tutor/TutorProfileForm";
import tutorService from "@/services/tutor/tutor.service";

const TutorProfilePage = async () => {
  const { data } = await tutorService.getTutorProfile();
  const categories = await getAllCategories();
  const { data: user } = await getUserSession();

  return (
    <div>
      <TutorProfileForm
        mode={data ? "update" : "create"}
        categories={categories.data ?? []}
        tutorProfile={data}
        user={user.user}
      ></TutorProfileForm>
    </div>
  );
};

export default TutorProfilePage;
