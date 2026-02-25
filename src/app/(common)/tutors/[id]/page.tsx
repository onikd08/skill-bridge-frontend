import { getUser } from "@/actions/auth/auth.action";
import TutorBookingCard from "@/components/modules/students/TutorBookingCard";
import TutorProfileCard from "@/components/modules/tutor/TutorProfileCard";
import tutorService from "@/services/tutor/tutor.service";

const TutorProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: tutor } = await tutorService.getTutorWithId(id);
  const availability = tutor.availability;
  const userData = await getUser();
  return (
    <div>
      <TutorProfileCard tutor={tutor} />
      <TutorBookingCard
        tutorName={tutor.user.name}
        availability={availability}
        userData={userData}
      />
    </div>
  );
};

export default TutorProfilePage;
