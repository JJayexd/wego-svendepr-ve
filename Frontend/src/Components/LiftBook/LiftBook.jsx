import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";
import { useAuth } from "../../Providers/AuthProvider";

export const LiftBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loginData } = useAuth();

    const {
        data: lift,
        loading: liftLoading,
        error: liftError,
        doFetch: fetchLift,
    } = useFetch();

    const {
        data: bookingData,
        loading: bookingLoading,
        error: bookingError,
        doFetch: doBooking,
    } = useFetch();

    const [seats, setSeats] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (id) {
            fetchLift(`http://localhost:4000/api/trips/${id}`);
        }
    }, [id, fetchLift]);

    if (liftLoading) return <p>Henter tur...</p>;
    if (liftError) return <p>{liftError}</p>;
    if (!lift) return <p>Ingen data fundet.</p>;

    const seatsLeft = lift.seatsTotal - (lift.seatsBooked || 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loginData) {
            alert("Login for at booke.");
            return;
        }

        if (!seats) {
            alert("Pladser er tom.");
            return;
        }

        doBooking(`http://localhost:4000/api/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loginData.accessToken}`,
            },
            body: JSON.stringify({
                tripId: Number(id),
                userId: loginData.user.id,
                comment,
                numSeats: Number(seats),
            }),
        });
    };

    if (bookingData) {
        navigate(`/trips/${id}`);
    }

    return (
        <div className="p-6 md:w-2xl m-auto">
            <h2 className="text-xl font-bold mb-4">Book et lift</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="seats" className="block mb-2">Pladser</label>
                    <select
                        id="seats"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        className="border rounded-full bg-white w-[200px] p-2"
                    >
                        <option value="">0</option>
                        {Array.from({ length: seatsLeft }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="comment" className="block mb-2">Besked til Chaufføren</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder=""
                        className="w-full bg-white border rounded-lg p-2 h-24 resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-[200px] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                    {bookingLoading ? "Sender..." : "Bekræft booking"}
                </button>
            </form>

            {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}
        </div>
    );
};
