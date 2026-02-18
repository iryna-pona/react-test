import Image from "next/image";
import Link from "next/link";
import css from "./Travellers.module.css";

export default function TravellerCard({ traveller }) {
  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <Image
          src={traveller.avatar}
          alt={traveller.name}
          width={60}
          height={60}
        />
      </div>

      <h3 className={css.name}>{traveller.name}</h3>

      <p className={css.description}>
        {traveller.description}
      </p>

      <Link
        href={`/travellers/${traveller.id}`}
        className={css.profileBtn}
      >
        Переглянути профіль
      </Link>
    </div>
  );
}