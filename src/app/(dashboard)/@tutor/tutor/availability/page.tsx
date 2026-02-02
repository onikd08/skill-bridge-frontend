import TutorAvailabilityForm from "@/components/modules/tutor/TutorAvailabilityForm";
import tutorService from "@/services/tutor/tutor.service";

const TutorAvailabilityPage = async () => {
  const { data: availability } = await tutorService.getTutorAvailability();
  return (
    <div>
      TutorAvailabilityPage
      <TutorAvailabilityForm
        availability={availability}
      ></TutorAvailabilityForm>
    </div>
  );
};

export default TutorAvailabilityPage;
