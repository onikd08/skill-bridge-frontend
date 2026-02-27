import bookingService from "@/services/bookings/bookings.service";

export const getAllBookings = async () => {
  const data = await bookingService.getAllBookings();
  return data;
};
