import { getUser } from "@/actions/auth/auth.action";
import TutorBookingCard from "@/components/modules/students/TutorBookingCard";
import TutorProfileCard from "@/components/modules/tutor/TutorProfileCard";
import tutorService from "@/services/tutor/tutor.service";
import TutorReviewsCard from "@/components/modules/tutor/TutorReviewsCard";
import { getStudentById } from "@/actions/user/user.action";

const TutorProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: tutor } = await tutorService.getTutorWithId(id);
  const availability = tutor?.availability;
  const rawReviews = tutor?.reviews || [];
  const userData = await getUser();

  const topReviews = rawReviews.slice(0, 3);
  const enrichedReviews = await Promise.all(
    topReviews.map(async (review: any) => {
      const studentRes = await getStudentById(review.studentId);
      return {
        ...review,
        student: studentRes?.data || null,
      };
    }),
  );

  return (
    <div className="pb-20">
      {availability && tutor && (
        <>
          <TutorProfileCard tutor={tutor} />
          <TutorBookingCard
            tutorName={tutor.user.name}
            availability={availability}
            userData={userData}
          />
          <TutorReviewsCard reviews={enrichedReviews} />
        </>
      )}
    </div>
  );
};

export default TutorProfilePage;
