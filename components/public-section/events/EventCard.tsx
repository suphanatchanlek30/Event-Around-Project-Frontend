"use client";
import { useRouter } from "next/navigation";
import styles from "./EventCard.module.css";

export default function EventCard() {
  const router = useRouter();

  return (
    <div 
      className={styles.card}
      onClick={() => router.push("/events/1")}
    >
      <div className={styles.image}>
        <span className={styles.badge}>UPCOMING</span>
        <button className={styles.heart}>♡</button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>Event Title</h3>
        <p className={styles.desc}>
          Description of the event will be shown here...
        </p>

        <div className={styles.info}>
          <span>📍 Location</span>
          <span>⏰ Time</span>
        </div>
      </div>
    </div>
  );
}