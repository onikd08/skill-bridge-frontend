import TutorDashboard from "@/components/modules/tutor/TutorDashboard";
import tutorService from "@/services/tutor/tutor.service";

const TutorDashboardPage = async () => {
  const { data: tutor } = await tutorService.getTutorProfileByUserId();

  return (
    <div>
      {tutor ? (
        <TutorDashboard tutor={tutor} />
      ) : (
        <h1 className="text-2xl">Profile not created yet</h1>
      )}
    </div>
  );
};

export default TutorDashboardPage;
