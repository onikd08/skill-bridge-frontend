import { getMyBookings } from "@/actions/student/student.action";
import BookingsList from "@/components/modules/students/BookingList";

const StudentBookingsPage = async () => {
  const { data: bookings } = await getMyBookings();
  return (
    <div>
      StudentBookingsPage
      <BookingsList bookings={bookings} />
    </div>
  );
};

export default StudentBookingsPage;
