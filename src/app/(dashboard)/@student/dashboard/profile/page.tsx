import { getMyInfo } from "@/actions/student/student.action";
import StudentProfileCard from "@/components/modules/students/StudentProfileCard";

export const metadata = {
  title: "My Profile - SkillBridge",
  description: "My Profile - SkillBridge",
};

const StudentProfilePage = async () => {
  const { data: student } = await getMyInfo();
  return (
    <div>
      <StudentProfileCard student={student} />
    </div>
  );
};

export default StudentProfilePage;
