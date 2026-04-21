import styles from "./dashboard.module.css";

export default function DashboardLoading() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <header className={styles.top}>
          <h1 className={styles.h1Title}>
            <span className={styles.slash}>/</span>playbook-health
          </h1>
          <div className={styles.sync}>loading…</div>
        </header>
        <div className={styles.statusStrip}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${styles.stat} ${styles.skel} ${styles.skelStat}`} />
          ))}
        </div>
        <div className={styles.main}>
          <div className={`${styles.panel} ${styles.skel} ${styles.skelPanel}`} />
          <div className={`${styles.panel} ${styles.skel} ${styles.skelPanel}`} />
        </div>
        <div className={styles.bottom}>
          <div className={`${styles.panel} ${styles.skel} ${styles.skelPanel}`} />
          <div className={`${styles.panel} ${styles.skel} ${styles.skelPanel}`} />
        </div>
        <div className={`${styles.staleFull} ${styles.skel} ${styles.skelStale}`} />
      </div>
    </div>
  );
}
