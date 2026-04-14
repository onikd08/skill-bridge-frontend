import { getAllBookings } from "@/actions/bookings/bookings.action";
import AllBookingsTable from "@/components/modules/bookings/AllBookingsTable";

export const metadata = {
  title: "All Bookings - SkillBridge",
  description: "All Bookings - SkillBridge",
};

const BookingsPage = async () => {
  const { data, success } = await getAllBookings();
  return (
    <div>
      <h1 className="text-xl mb-5">All Bookings </h1>
      {success && <AllBookingsTable bookings={data} />}
    </div>
  );
};

export default BookingsPage;
