import { getAllBookings } from "@/actions/bookings/bookings.action";
import BookingsList from "@/components/modules/students/BookingList";

export const metadata = {
  title: "My Bookings - SkillBridge",
  description: "My Bookings - SkillBridge",
};

const StudentBookingsPage = async () => {
  const { data, success } = await getAllBookings();

  return (
    <div>
      <h1 className="mb-5">My Bookings</h1>
      {success && <BookingsList bookings={data} />}
    </div>
  );
};

export default StudentBookingsPage;
