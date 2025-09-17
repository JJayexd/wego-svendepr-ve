import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";

export const LiftDetails = () => {
  const { id } = useParams();
  const { data, loading, error, doFetch } = useFetch();

  useEffect(() => {
    if (id) {
      doFetch(`http://localhost:4000/api/trips/${id}`);
    }
  }, [id, doFetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Ingen data.</p>;

  const lift = Array.isArray(data) ? data[0] : data;
  if (!lift) return <p>Lift ikke fundet</p>;

  const bagSizeMap = {
    1: "Lille skuldertaske eller rygsæk",
    2: "Mellem skuldertaske eller rygsæk",
    3: "Stor skuldertaske eller rygsæk",
  };
  

  return (
    <div className="p-4">
      <div className="p-4">
        <h2 className="font-semibold">{lift.cityDeparture} til {lift.cityDestination}</h2>
        <p>{lift.departureDate}</p>
          <div className="flex flex-row my-2">
            <p className="bg-white rounded-full p-2">
              Afgang:
              10:00
            </p>
            <p className="bg-white rounded-full p-2">
              Ankomst:
              10:00
            </p>
          </div>
        <h2 className="font-semibold">Information</h2>
          <div className="bg-white p-4 space-y-1 rounded-lg">
            <p className="font-semibold">
              <i className="fa-solid fa-ferry"></i>{" "}
              {lift.useFerry ? "Rute inkluderer en færge" : "Ingen færge"}
            </p>
            <h2 className="font-semibold mt-2">Detaljer</h2>
            <p>
              <i classNames="fa-solid fa-user-group"></i>
              {lift.seatsTotal}
            </p>
            <p>
              <i className="fa-solid fa-suitcase"></i>{" "}
              {bagSizeMap[lift.bagSizeId] || "Ukendt"}
            </p>
            <p>
              <i className="fa-solid fa-bolt"></i>
              {lift.isElectric ? "Bilen er elektrisk" : "Bilen er ikke elektrisk"}
            </p>
          </div>
      </div>
    </div>
  );
};
