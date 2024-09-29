import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Cabin from "@/app/_components/Cabin";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams({ params }) {
  // EXPORT STATIC routes from dynamic data this is used to get all the IDS to create
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const [cabin] = await Promise.all([
    // getSettings(),
    // getBookedDatesByCabinId(params.cabinId),
    getCabin(params.cabinId),
  ]);

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-3xl font-semibold text-center mb-10 text-accent-400">
          Reserve Cabin&ndash;{name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />} key={params.cabinId}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
