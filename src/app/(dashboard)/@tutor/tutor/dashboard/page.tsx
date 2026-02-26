import TutorDashboard from "@/components/modules/tutor/TutorDashboard";
import tutorService from "@/services/tutor/tutor.service";

const TutorDashboardPage = async () => {
  const { data: tutor } = await tutorService.getTutorProfileByUserId();
  console.log(tutor);
  return (
    <div>
      <TutorDashboard tutor={tutor} />
    </div>
  );
};

export default TutorDashboardPage;
