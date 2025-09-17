import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";

export const LiftDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
          <div className="flex flex-row my-2 gap-2">
            <p className="bg-white rounded-lg p-2">
              Afgang:
              10:00
            </p>
            <p className="bg-white rounded-lg p-2">
              Ankomst:
              10:00
            </p>
          </div>

          <h2 className="font-semibold">Information</h2>
            <div className="bg-white p-4 space-y-2 rounded-lg">
              <p className="font-semibold">
                <i className="fa-solid fa-ferry mr-1"></i>
                {lift.useFerry ? "Rute inkluderer en færge" : "Ingen færge"}
              </p>

              <h2 className="font-semibold mt-2">Detaljer</h2>
              <ul className="list-none">
                <li>
                  <i className="fa-solid fa-user-group mr-1"></i>
                  {lift.seatsTotal}
                </li>
                <li>
                  <i className="fa-solid fa-suitcase mr-1"></i>
                  {bagSizeMap[lift.bagSizeId] || "Ukendt"}
                </li>
                <li>
                  <i className="fa-solid fa-bolt mr-1"></i>
                  {lift.isElectric ? "Bilen er elektrisk" : "Bilen er ikke elektrisk"}
                </li>
              </ul>



            <h4 className="font-semibold my-2">Præferencer</h4>
              <ul className="grid grid-cols-2 gap-y-1">
                <li className="flex items-center gap-2">
                  {lift.allowMusic ? (
                    <i className="fa-solid fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-xmark text-red-500"></i>
                  )}
                  Musik
                </li>
                <li className="flex items-center gap-2">
                  {lift.allowPets ? (
                    <i className="fa-solid fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-xmark text-red-500"></i>
                  )}
                  Kæledyr
                </li>
                <li className="flex items-center gap-2">
                  {lift.allowSmoking ? (
                    <i className="fa-solid fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-xmark text-red-500"></i>
                  )}
                  Rygning
                </li>
                <li className="flex items-center gap-2">
                  {lift.allowChildren ? (
                    <i className="fa-solid fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-xmark text-red-500"></i>
                  )}
                  Børn
                </li>
              </ul>
          </div>

          <h3 className="font-semibold mt-4">Chaufførens kommentar</h3>
            {lift.comment && (
              <div className="bg-white p-4 rounded-lg ">
                <p className="">
                  {lift.comment}
                </p>
              </div>
            )}

          <h3 className="font-semibold mt-4">Chaufføren</h3>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2">
                <img
                  src={lift.user?.imageUrl}
                  alt={lift.user?.firstname}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {lift.user?.firstname} {lift.user?.lastname}
                  </p>
                  <p className="text-sm text-gray-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={
                      i < lift.user.avgStars
                        ? "fa-solid fa-star text-yellow-400"
                        : "fa-solid fa-star text-gray-300"
                      }
                    ></i>
                    ))}
                  </p>
                </div>
              </div>
            </div>

          {/* Pladser */}
          <h3 className="font-semibold mt-4">Pladser</h3>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold rounded-full border p-2">Pris {lift.pricePerSeat} DKK</p>
              <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg">
                Book
              </button>
            </div>
          <button
            onClick={() => navigate("/lift")}
            className="w-full bg-gray-200 py-2 mt-4 rounded-full hover:bg-gray-300 transition"
          >
            Tilbage
        </button>
      </div>
    </div>
  );
};
