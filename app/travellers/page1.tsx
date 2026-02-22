"use client";

import { useState, useEffect, useRef } from "react";
import TravellersList from "@/components/OurTravellers/TravellersList";
import { getTravellers } from "@/lib/travellers-api";
import { User } from "@/types/user";
import css from "@/components/OurTravellers/OurTravellers.module.css";

export default function TravellersPage() {
  const [travellers, setTravellers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [initialLimit, setInitialLimit] = useState(8); // початковий ліміт
  const LIMIT = 4; // підвантаження по 4

  const loadMoreBtnRef = useRef<HTMLButtonElement>(null);

  // Визначаємо початковий limit по ширині вікна
  useEffect(() => {
    function determineInitialLimit() {
      const width = window.innerWidth;
      if (width < 1440) setInitialLimit(8);
      else setInitialLimit(12);
    }

    determineInitialLimit();
    window.addEventListener("resize", determineInitialLimit);
    return () => window.removeEventListener("resize", determineInitialLimit);
  }, []);

  // Початкове завантаження
  useEffect(() => {
    async function loadTravellers() {
      setLoading(true);
      try {
        const data = await getTravellers({ page: 1, limit: initialLimit });
        setTravellers(data.items);
        setHasMore(data.hasMore);
        setPage(1);
      } catch (err) {
        console.error("Failed to load travellers", err);
      } finally {
        setLoading(false);
      }
    }
    loadTravellers();
  }, [initialLimit]);

  // Показати ще
  async function handleLoadMore() {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const data = await getTravellers({ page: nextPage, limit: LIMIT });
      setTravellers(prev => [...prev, ...data.items]);
      setHasMore(data.hasMore);
      setPage(nextPage);

      // Автоскрол після підвантаження
      setTimeout(() => {
        if (loadMoreBtnRef.current) {
          loadMoreBtnRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // невелика затримка, щоб DOM оновився
    } catch (err) {
      console.error("Failed to load more travellers", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={css.section}>
      <h1 className={css.title}>Мандрівники</h1>

      <TravellersList travellers={travellers} />

      {hasMore && (
        <button
          ref={loadMoreBtnRef}
          className={css.loadMoreBtn}
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Завантаження..." : "Показати ще"}
        </button>
      )}
    </section>
  );
}