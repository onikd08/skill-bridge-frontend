import { getStudentInfo } from "@/actions/student/student.action";
import StudentProfileCard from "@/components/modules/students/StudentProfileCard";

const StudentProfilePage = async () => {
  const { data } = await getStudentInfo();

  return (
    <div>
      StudentProfilePage
      <StudentProfileCard student={data} />
    </div>
  );
};

export default StudentProfilePage;
