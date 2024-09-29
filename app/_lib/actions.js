"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "@/app/_lib/supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session.user) throw new Error("You must be logged in");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
    // could use for all Object.entries(formData.entries())
  };

  // FUTURE: add validation to check

  const { data, error } = await supabase.from("bookings").insert([newBooking]);
  // So that the newly created object gets returned!
  // .select()
  // .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session.user) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updateData = { nationality, countryFlag, nationalID };
  console.log(updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  // .select()
  // .single();

  if (error) throw new Error("Guest could not be updated");

  // refresh the cache for this route - ensure client cache is freshs
  revalidatePath("/account/profile/");
}
export async function updateBookingAction(formData) {
  // 1. confirm Session
  const session = await auth();
  if (!session.user) throw new Error("You must be logged in");

  // 2. Create Data Update Object
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  const bookingId = Number(formData.get("bookingId"));

  // 3. Authorising
  // hack security to stop users from cURLing deleting
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  console.log("guestBookingsIds", guestBookingsIds);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 4. Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);
  // .select()
  // .single();

  if (error) throw new Error("Booking could not be updated");

  //  6. Revalidation
  revalidatePath("account/reservations/");
  revalidatePath(`account/reservations/edit/${bookingId}`);

  // 7. Redirect
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session.user) throw new Error("You must be logged in");

  // TESTING
  // await new Promise((res) => setTimeout(res, 3000));
  // throw new Error("testing ");

  // hack security to stop users from cURLing deleting
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking oculd not be deleted");
  revalidatePath("/account/reservations/");
}

//  Server action for form actions
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
