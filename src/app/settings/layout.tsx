import styles from "./layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <main className={styles.main}>
            {children}
            <div className={styles.return_arrow}>
                <a href="/">{"<"}</a>
            </div>
        </main>
    );
}
