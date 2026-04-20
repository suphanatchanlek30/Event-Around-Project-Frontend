import styles from "./EventDetail.module.css";

export default function EventDetailPage() {
  return (
    <div className={styles.container}>

        {/* Cover */}
        <div className={styles.cover}></div>

        <div className={styles.main}>

            {/* LEFT */}
            <div className={styles.left}>

            <div className={styles.tags}>
                <span className={styles.tag}>Technology</span>
                <span className={styles.status}>Published</span>
            </div>

            <h1 className={styles.title}>
                Event Title Goes Here
            </h1>

            <div className={styles.organizer}>
                Organized by Organizer Name
            </div>

            <p className={styles.desc}>
                Event description will appear here...
            </p>

            </div>

            {/* RIGHT */}
            <div className={styles.right}>

            <button className={styles.register}>
                Register Now
            </button>

            <div className={styles.infoBox}>
                <div>📅 Date & Time</div>
                <div>📍 Location</div>
            </div>

            <div className={styles.map}></div>

            </div>

        </div>
    </div>
  );
}