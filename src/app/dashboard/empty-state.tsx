import styles from "./dashboard.module.css";

export function EmptyState() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <header className={styles.top}>
          <h1 className={styles.h1Title}>
            <span className={styles.slash}>/</span>playbook-health
          </h1>
        </header>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>No entries yet</span>
          </div>
          <p style={{ padding: "20px 0", color: "var(--d-muted)", lineHeight: 1.6 }}>
            아직 위키 엔트리가 없습니다. 첫 엔트리를 추가하면 커버리지 / 갭 / source mix 지표가 표시됩니다.
          </p>
          <p style={{ color: "var(--d-muted)", fontFamily: "var(--font-dashboard-mono), monospace", fontSize: 12 }}>
            CLI: <code>pnpm generate-lesson generate-custom &quot;주제 텍스트&quot;</code>
          </p>
        </div>
      </div>
    </div>
  );
}
