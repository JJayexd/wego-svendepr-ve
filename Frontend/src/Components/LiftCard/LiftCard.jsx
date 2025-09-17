export const LiftCard = ({ lift }) => {
    const date = new Date(lift.departureDate);
    const time = date.toLocaleTimeString("da-DK", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="bg-white p-4 my-4 rounded-t w-[300px] md:w-[700px] flex flex-col md:flex-row md:items-start md:justify-between ">
            
            {/* Bruger Info, Desktop */}
            <div className="hidden md:flex flex-col items-center md:w-40">
                <img
                    src={lift.user.imageUrl}
                    alt={`${lift.user.firstname} ${lift.user.lastname}`}
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div className="text-center mt-2">
                    <p className="font-semibold">
                        {lift.user.firstname} {lift.user.lastname}
                    </p>
                    <div className="flex justify-center mt-2">
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
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                <p className="text-gray-500 flex items-center gap-2">
                    <i className="fa-solid fa-clock text-sm"></i>
                    {date.toLocaleDateString("da-DK")} kl. {time}
                </p>

                {/* Departure */}
                <div className="border md:border-none rounded-full md:rounded-none px-4 py-2 flex items-center gap-3">
                    <i className="fa-solid fa-location-crosshairs text-blue-500"></i>
                    <div className="flex flex-col">
                        <p className="font-semibold text-blue-600">
                            {lift.cityDeparture}
                        </p>
                        <p className="text-sm text-gray-600">
                            {lift.addressDeparture}
                        </p>
                    </div>
                </div>

                {/* Destination */}
                <div className="border md:border-none rounded-full md:rounded-none px-4 py-2 flex items-center gap-3">
                    <i className="fa-solid fa-location-dot text-blue-500"></i>
                    <div className="flex flex-col">
                        <p className="font-semibold text-blue-600">
                            {lift.cityDestination}
                        </p>
                        <p className="text-sm text-gray-600">
                            {lift.addressDestination}
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-col items-center md:w-40 gap-2">
                <p className="font-semibold">DKK {lift.pricePerSeat}</p>
                <div className="flex gap-1">
                    {Array.from({ length: lift.seatsTotal }).map((_, i) => (
                        <span
                            key={i}
                            className={`w-4 h-4 rounded-full ${
                                i < lift.seatsBooked
                                    ? "bg-red-500"
                                    : "bg-green-500"
                            }`}
                        ></span>
                    ))}
                </div>
            </div>

            <div className="md:hidden flex flex-col gap-4 mt-4">
                {/* Pris & Seats */}
                <div className="border rounded-full px-4 py-2 flex items-center justify-between gap-4">
                    <p className="font-semibold">DKK {lift.pricePerSeat}</p>
                    <div className="flex gap-1">
                        {Array.from({ length: lift.seatsTotal }).map((_, i) => (
                            <span
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                    i < lift.seatsBooked
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                }`}
                            ></span>
                        ))}
                    </div>
                </div>

                {/* Bruger Info, Mobil */}
                <div className="flex items-center gap-3">
                    <img
                        src={lift.user.imageUrl}
                        alt={`${lift.user.firstname} ${lift.user.lastname}`}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-medium">
                            {lift.user.firstname} {lift.user.lastname}
                        </p>
                        <div className="flex">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
