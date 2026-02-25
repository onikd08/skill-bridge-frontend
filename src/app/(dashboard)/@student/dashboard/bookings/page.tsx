import { getMyBookings } from "@/actions/student/student.action";
import BookingsList from "@/components/modules/students/BookingList";

const StudentBookingsPage = async () => {
  const { data } = await getMyBookings();
  return (
    <div>
      StudentBookingsPage
      <BookingsList bookings={data} />
    </div>
  );
};

export default StudentBookingsPage;
