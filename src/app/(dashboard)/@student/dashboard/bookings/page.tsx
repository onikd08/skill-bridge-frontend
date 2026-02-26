import { getMyBookings } from "@/actions/student/student.action";
import BookingsList from "@/components/modules/students/BookingList";

const StudentBookingsPage = async () => {
  const { data } = await getMyBookings();
  return (
    <div>
      <h1 className="mb-5">My Bookings</h1>
      <BookingsList bookings={data} />
    </div>
  );
};

export default StudentBookingsPage;
