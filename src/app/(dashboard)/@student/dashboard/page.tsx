import { getMyInfo } from "@/actions/student/student.action";
import StudentDashboard from "@/components/modules/students/StudentDashboard";

export const metadata = {
  title: "Student Dashboard - SkillBridge",
  description: "Student Dashboard - SkillBridge",
};

const StudentDashboardPage = async () => {
  const { data, success } = await getMyInfo();

  return <div>{success && <StudentDashboard student={data} />}</div>;
};

export default StudentDashboardPage;
