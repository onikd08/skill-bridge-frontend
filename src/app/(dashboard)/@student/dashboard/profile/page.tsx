import { getUser } from "@/actions/auth/auth.action";
import { getMyInfo } from "@/actions/student/student.action";
import StudentProfileCard from "@/components/modules/students/StudentProfileCard";

const StudentProfilePage = async () => {
  const userData = await getUser();

  const { data: student } = await getMyInfo(userData.id);
  return (
    <div>
      <StudentProfileCard student={student} />
    </div>
  );
};

export default StudentProfilePage;
