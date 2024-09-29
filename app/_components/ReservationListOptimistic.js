"use client";

import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "@/app/_lib/actions";

function ReservationListOptimistic({ bookings }) {
  // always think of 2 states... the modified and the actual
  // const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) =>
      curBookings.filter((booking) => booking.id !== bookingId)
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {/* before optimistic
      {bookings.map((booking) => ( */}
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationListOptimistic;
