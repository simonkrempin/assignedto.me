import styles from "./layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return <section className={styles.body}>{children}</section>;
}