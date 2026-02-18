import TravellersList from "@/components/Travellers/TravellersList";
import css from "./TravellersPage.module.css";

export default function TravellersPage() {
  return (
    <section className={css.section}>
      <h1 className={css.title}>Мандрівники</h1>
      <TravellersList />
    </section>
  );
}