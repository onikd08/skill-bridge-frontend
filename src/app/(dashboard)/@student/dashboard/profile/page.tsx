import { getMyInfo } from "@/actions/student/student.action";
import StudentProfileCard from "@/components/modules/students/StudentProfileCard";

const StudentProfilePage = async () => {
  const { data: student } = await getMyInfo();
  return (
    <div>
      <StudentProfileCard student={student} />
    </div>
  );
};

export default StudentProfilePage;
