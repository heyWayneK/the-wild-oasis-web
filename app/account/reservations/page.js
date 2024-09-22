import PageHeading from "@/app/_components/PageHeading";
import ReservationCard from "@/app/_components/ReservationCard";
// import { useSearchParams } from "next/navigation";

export const metadata = {
  // title: {Window.location.href.split("/")[length-1]},
  title: "Reservation",
};

export default function Page() {
  // CHANGE
  const bookings = [];

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
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
