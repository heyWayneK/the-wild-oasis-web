import { updateBookingAction } from "@/app/_lib/actions/";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";
// import { SubmittingButton } from "@/app/_components/SubmittingButton";

export default async function Page({ params }) {
  const session = await auth();
  const reservationId = params.bookingId;
  const guestId = session.user.guestId;
  const booking = await getBooking(reservationId);
  const {
    id: bookingId,
    // created_at,
    // startDate,
    // endDate,
    // numNights,
    numGuests,
    // cabinPrice,
    // extrasPrice,
    // totalPrice,
    // status,
    // hasBreakfast,
    // isPaid,
    observations,
    cabinId,
    guestId: bookingGuestId,
  } = booking;

  const { maxCapacity } = await getCabin(cabinId);

  // CHANGE
  // is this teh customets booking
  if (bookingGuestId !== guestId)
    throw new Error("You do dont have permission to edit this booking");

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateBookingAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={numGuests}
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {/* <SubmittingButton>Update</SubmittingButton> */}
          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update Reservation
          </button>
        </div>
        <input type="hidden" name="bookingId" value={bookingId}></input>
      </form>
    </div>
  );
}
