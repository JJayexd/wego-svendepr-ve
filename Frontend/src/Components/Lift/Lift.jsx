export const Lift = () => {
    return (
      <div className="p-4 w-full md:w-[900px] m-auto flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="relative flex-1">
          <i class="fa-solid fa-location-crosshairs text-blue-500 absolute left-2 top-1/2 -translate-y-1/2"></i>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 pl-8"
            type="text"
            placeholder="Hvor fra?"
          />
        </div>
  
        <div className="relative flex-1">
        <i class="fa-solid fa-location-dot text-blue-500 absolute left-2 top-1/2 -translate-y-1/2"></i>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 pl-8"
            type="text"
            placeholder="Hvor til?"
          />
        </div>
  
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg md:self-stretch">
          Søg
        </button>
      </div>
    );
  };
  