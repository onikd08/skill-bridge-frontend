import TutorBookingCard from "@/components/modules/students/TutorBookingCard";
import TutorProfileCard from "@/components/modules/tutor/TutorProfileCard";
import { env } from "@/env";
import tutorService from "@/services/tutor/tutor.service";

const API_URL = env.API_URL;
const getActiveTutorAvailabilityWithId = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/tutor/availability/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Something went wrong",
      },
    };
  }
};

const TutorProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: tutor } = await tutorService.getTutorWithId(id);
  const { data: availability } = await getActiveTutorAvailabilityWithId(id);

  return (
    <div>
      <TutorProfileCard tutor={tutor} />
      <TutorBookingCard
        tutorName={tutor.user.name}
        tutorProfileId={id}
        availability={availability}
      />
    </div>
  );
};

export default TutorProfilePage;
