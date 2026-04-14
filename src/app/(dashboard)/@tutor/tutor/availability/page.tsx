import TutorAvailabilityForm from "@/components/modules/tutor/TutorAvailabilityForm";
import tutorService from "@/services/tutor/tutor.service";

export const metadata = {
  title: "Tutor Availability - SkillBridge",
  description: "Tutor Availability - SkillBridge",
};

const TutorAvailabilityPage = async () => {
  const { success, data: availability } =
    await tutorService.getTutorAvailability();

  return (
    <div>
      {success && (
        <TutorAvailabilityForm
          availability={availability}
        ></TutorAvailabilityForm>
      )}
    </div>
  );
};

export default TutorAvailabilityPage;
