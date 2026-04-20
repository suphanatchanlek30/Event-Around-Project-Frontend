"use client";
import { useState } from "react";
import styles from "./EventSearch.module.css";

export default function EventSearch() {
  const [activeTab, setActiveTab] = useState("latest");
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    distance: "",
  });

  const handleClear = () => {
    setFilters({
      category: "",
      date: "",
      distance: "",
    });
  };

  return (
    <div className={styles.container}>

      {/* Search */}
      <div className={styles.searchBox}>
        <span className={styles.icon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search events, workshops, or meetups..."
        />
        <button className={styles.filterIcon}>⚙️</button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "latest" ? styles.active : ""}`}
          onClick={() => setActiveTab("latest")}
        >
          Latest
        </button>

        <button
          className={`${styles.tab} ${activeTab === "nearby" ? styles.active : ""}`}
          onClick={() => setActiveTab("nearby")}
        >
          Nearby
        </button>

        <button
          className={`${styles.tab} ${activeTab === "upcoming" ? styles.active : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <button
          className={styles.filterBtn}
          onClick={() => alert("เลือก Category")}
        >
          Category
        </button>

        <button
          className={styles.filterBtn}
          onClick={() => alert("เลือก Date Range")}
        >
          Date Range
        </button>

        <button
          className={styles.filterBtn}
          onClick={() => alert("เลือก Distance")}
        >
          Distance
        </button>

        <span className={styles.clear} onClick={handleClear}>
          CLEAR ALL
        </span>
      </div>

      {/* Debug (ดูว่า state เปลี่ยนจริง) */}
      <div className={styles.debug}>
        <p>Active Tab: {activeTab}</p>
        <p>Filters: {JSON.stringify(filters)}</p>
      </div>

    </div>
  );
}