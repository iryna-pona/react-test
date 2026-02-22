"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TravellerCard from "./TravellerCard";
import css from "./Travellers.module.css";

const LIMIT = 4;

export default function TravellersList() {
  const [travellers, setTravellers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTravellers = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `/api/travellers?page=${page}&limit=${LIMIT}`
      );

      setTravellers((prev) => [...prev, ...data.items]);
      setHasMore(data.hasMore);
    } catch (err) {
      setError("Не вдалося завантажити мандрівників");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravellers();
  }, [page]);

  return (
    <>
      <div className={css.grid}>
        {travellers.map((traveller) => (
          <TravellerCard key={traveller.id} traveller={traveller} />
        ))}
      </div>

      {loading && <p className={css.loader}>Завантаження...</p>}

      {error && <p className={css.error}>{error}</p>}

      {hasMore && !loading && (
        <button
          type="button"
          onClick={() => setPage((prev) => prev + 1)}
          className={css.loadMore}
        >
          Переглянути всі
        </button>
      )}
    </>
  );
}