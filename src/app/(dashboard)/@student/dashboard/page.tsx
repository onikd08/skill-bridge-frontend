import { getMyInfo } from "@/actions/student/student.action";
import StudentDashboard from "@/components/modules/students/StudentDashboard";

const StudentDashboardPage = async () => {
  const { data, success } = await getMyInfo();

  return <div>{success && <StudentDashboard student={data} />}</div>;
};

export default StudentDashboardPage;
