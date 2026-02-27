import { getAllBookings } from "@/actions/bookings/bookings.action";
import AdminStatistics from "@/components/modules/bookings/AdminStatistics";

const AdminDashboardPage = async () => {
  const { data, success } = await getAllBookings();

  return (
    <div>
      <h1 className="text-xl">Analytics</h1>
      {success && <AdminStatistics bookings={data} />}
    </div>
  );
};

export default AdminDashboardPage;
