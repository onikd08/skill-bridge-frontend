import { getMyInfo } from "@/actions/student/student.action";
import TutorLandingPage from "@/components/modules/tutor/TutorLandingPage";

export const metadata = {
  title: "Tutor Dashboard - SkillBridge",
  description: "Tutor Dashboard - SkillBridge",
};

const page = async () => {
  const { data } = await getMyInfo();
  return (
    <div>
      <TutorLandingPage tutor={data} />
    </div>
  );
};

export default page;
