import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useFetch } from "../../Hooks/useFetch";
import { LiftCard } from "../LiftCard/LiftCard";

export const LiftList = ({ search, filters }) => {
  const { data, loading, error, doFetch } = useFetch();

  useEffect(() => {
    doFetch("http://localhost:4000/api/trips");
  }, [doFetch]);

  if (loading) return <p>Henter...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Ingen data.</p>;

  const filtered = data.filter((lift) => {
    const fromMatch = search.from
      ? lift.cityDeparture.toLowerCase().includes(search.from.toLowerCase())
      : true;
    const toMatch = search.to
      ? lift.cityDestination.toLowerCase().includes(search.to.toLowerCase())
      : true;

    const availableSeats = lift.seatsTotal - lift.seatsBooked;
    const seatsMatch = availableSeats >= filters.seats;

    const baggageMap = { Lille: 1, Mellem: 2, Stor: 3 };
    const baggageMatch = filters.baggage
      ? lift.bagSizeId === baggageMap[filters.baggage]
      : true;

    const comfortMatch = filters.comfort ? lift.hasComfort : true;

    const prefs = filters.preferences;
    const prefMatch =
      (!prefs.music || lift.allowMusic) &&
      (!prefs.pets || lift.allowPets) &&
      (!prefs.kids || lift.allowChildren) &&
      (!prefs.smoking || lift.allowSmoking);

    return fromMatch && toMatch && seatsMatch && baggageMatch && comfortMatch && prefMatch;
  });

  return (
    <div className="space-y-4 mt-4 m-auto w-[300px] md:w-4xl">
      {filtered.length > 0 ? (
        filtered.slice(0, 6).map((lift) => (
          <Link key={lift.id} to={`/trips/${lift.id}`}>
            <LiftCard lift={lift} />
          </Link>
        ))
      ) : (
        <p className="text-gray-500">Ingen resultater</p>
      )}
    </div>
  );
};

