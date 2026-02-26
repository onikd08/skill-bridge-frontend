import TutorAvailabilityForm from "@/components/modules/tutor/TutorAvailabilityForm";
import tutorService from "@/services/tutor/tutor.service";

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
