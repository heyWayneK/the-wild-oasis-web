import PageHeading from "@/app/_components/PageHeading";
import ReservationListOptimistic from "@/app/_components/ReservationListOptimistic";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
// import { useSearchParams } from "next/navigation";

export const metadata = {
  title: "Reservation",
};
// { bookings }
export default async function Page() {
  // CHANGE
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <PageHeading>Your Reservation</PageHeading>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationListOptimistic bookings={bookings} />
      )}
    </div>
  );
}
