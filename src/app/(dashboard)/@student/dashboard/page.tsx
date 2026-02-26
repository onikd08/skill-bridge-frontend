import { getMyInfo } from "@/actions/student/student.action";
import StudentDashboard from "@/components/modules/students/StudentDashboard";

const StudentDashboardPage = async () => {
  const { data } = await getMyInfo();
  console.log(data);
  return (
    <div>
      <StudentDashboard student={data} />
    </div>
  );
};

export default StudentDashboardPage;
