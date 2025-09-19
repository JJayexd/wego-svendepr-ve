import { useState } from "react";
import { useFetch } from "../../Hooks/useFetch";
import { useAuth } from "../../Providers/AuthProvider";

export const ReviewModal = ({ isModalOpen, setIsModalOpen, reviewedUserId }) => {
  const { data, loading, error, doFetch } = useFetch();
  const { loginData } = useAuth();

  const [numStars, setNumStars] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData) {
        alert("Du skal være logget ind for at skrive en anmeldelse.");
        return;
      }

    doFetch("http://localhost:4000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.accessToken}`,
      },
      body: JSON.stringify({
        numStars,
        comment,
        reviewerId: loginData.userId,
        reviewedUserId,
      }),
    });
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="relative bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>

          <h2 className="text-2xl font-bold mb-4">Anmeld</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNumStars(i + 1)}
                >
                  <i
                    className={
                      i < numStars
                        ? "fa-solid fa-star text-yellow-400 text-2xl"
                        : "fa-regular fa-star text-gray-400 text-2xl"
                    }
                  ></i>
                </button>
              ))}
            </div>

            <textarea
              className="w-full border rounded-lg p-2 text-sm"
              rows="4"
              placeholder="..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {loading && <p className="text-sm text-gray-500">Sender...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {data && <p className="text-sm text-green-600">Sendt.</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    )
  );
};
