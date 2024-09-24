import PageHeading from "@/app/_components/PageHeading";
import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/updateProfileForm";

export const metadata = {
  title: "Update Profile",
};

export default function Page() {
  // CHANGE
  const nationality = "portugal";

  return (
    <div>
      <PageHeading>Update your guest profile</PageHeading>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
