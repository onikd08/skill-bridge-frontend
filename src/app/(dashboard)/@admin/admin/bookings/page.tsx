import { getAllBookings } from "@/actions/bookings/bookings.action";
import AllBookingsTable from "@/components/modules/bookings/AllBookingsTable";

const BookingsPage = async () => {
  const { data, success } = await getAllBookings();
  return <div>{success && <AllBookingsTable bookings={data} />}</div>;
};

export default BookingsPage;
