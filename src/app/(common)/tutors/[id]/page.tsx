import TutorProfileCard from "@/components/modules/tutor/TutorProfileCard";
import tutorService from "@/services/tutor/tutor.service";

const TutorProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: tutor } = await tutorService.getTutorWithId(id);

  return (
    <div>
      <TutorProfileCard tutor={tutor} />
    </div>
  );
};

export default TutorProfilePage;
