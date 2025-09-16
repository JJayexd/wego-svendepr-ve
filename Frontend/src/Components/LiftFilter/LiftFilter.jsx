import { useState } from 'react';

export const LiftFilter = () => {
  const [seats, setSeats] = useState(1);
  const [baggage, setBaggage] = useState("");
  const [comfort, setComfort] = useState(false);
  const [preferences, setPreferences] = useState({
    music: false,
    pets: false,
    kids: false,
    smoking: false,
  });

  const resetFilters = () => {
    setSeats(1);
    setBaggage("");
    setComfort(false);
    setPreferences({
      music: false,
      pets: false,
      kids: false,
      smoking: false,
    });
  };

  return (
    <aside className="hidden md:block md:w-1xl md:bg-white md:shadow md:p-4 md:space-y-4">
      {/* Antal Sæder */}
      <div>
        <label className="flex justify-between font-semibold">
          <span>Antal Pladser</span>
          <span>{seats}</span>
        </label>
        <input
          type="range"
          min="1"
          max="6"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="w-full accent-blue-500"
        />
      </div>

      {/* Bagage */}
      <div>
        <h3 className="font-semibold mb-2">Bagage</h3>
        <div className="flex justify-between">
          {["Lille", "Mellem", "Stor"].map((size) => (
            <button
              key={size}
              onClick={() => setBaggage(size)}
              className={`flex flex-col items-center text-sm ${
                baggage === size ? "text-blue-500 font-semibold" : "text-gray-600"
              }`}
            >
              <i className="fa-solid fa-suitcase text-l mb-1"></i>
              {size}
            </button>
          ))}
        </div>
      </div>

      <hr />

      {/* Komfort */}
      <div>
        <h3 className="font-semibold mb-2">Komfort</h3>
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={comfort}
            onChange={(e) => setComfort(e.target.checked)}
            className="w-5 h-5"
          />
          Højest to personer på bagsædet
        </label>
      </div>

      <hr />

      {/* Preferencer */}
      <div>
        <h3 className="font-semibold mb-2">Præferencer</h3>
        {[
          { key: "music", label: "Musik" },
          { key: "pets", label: "Dyr" },
          { key: "kids", label: "Børn" },
          { key: "smoking", label: "Rygning" },
        ].map((pref) => (
          <label
            key={pref.key}
            className="flex items-center gap-2 text-gray-700"
          >
            <input
              type="checkbox"
              checked={preferences[pref.key]}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  [pref.key]: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
            {pref.label}
          </label>
        ))}
      </div>

      <hr />

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full bg-blue-500 text-white py-2 rounded-full"
      >
        Nulstil
      </button>
    </aside>
  );
};
