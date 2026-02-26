import { getMyInfo } from "@/actions/student/student.action";
import TutorLandingPage from "@/components/modules/tutor/TutorLandingPage";

const page = async () => {
  const { data } = await getMyInfo();
  return (
    <div>
      <TutorLandingPage tutor={data} />
    </div>
  );
};

export default page;
