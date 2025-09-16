import { useEffect } from 'react';
import { useFetch } from '../../Hooks/useFetch';
import { LiftCard } from "../LiftCard/LiftCard";

export const LiftList = ({ search }) => {
  const { data, loading, error, doFetch } = useFetch();

  useEffect(() => {
    doFetch("http://localhost:4000/api/trips"); 
  }, [doFetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  // Filtrer data efter søge kriterier
  const filtered = data.filter((lift) => {
    const fromMatch = search.from
      ? lift.cityDeparture.toLowerCase().includes(search.from.toLowerCase())
      : true;
    const toMatch = search.to
      ? lift.cityDestination.toLowerCase().includes(search.to.toLowerCase())
      : true;

    return fromMatch && toMatch;
  });

  return (
    <div className="space-y-4 mt-4 m-auto w-[300px] md:w-4xl">
      {filtered.length > 0 ? (
        filtered.slice(0, 6).map((lift) => (
          <LiftCard key={lift.id} lift={lift} />
        ))
      ) : (
        <p className="text-gray-500">Ingen resultater</p>
      )}
    </div>
  );
};
