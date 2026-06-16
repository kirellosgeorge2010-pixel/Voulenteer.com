import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Compass, Briefcase, MessageSquare, Settings, LogOut, Sparkles } from "lucide-react";
import styles from "./layout.module.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  // Determine user role (this would normally come from session.user.role)
  // For now, we'll mock it based on email or default to STUDENT
  const role = (session.user as any)?.role || "STUDENT";
  const isOrg = role === "ORGANIZATION";

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}>
            <Sparkles className="text-accent" /> Volunext
          </Link>
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            <p className={styles.navTitle}>Menu</p>
            <Link href={isOrg ? "/dashboard/org" : "/dashboard/student"} className={styles.navLink}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            {!isOrg && (
              <Link href="/explore" className={styles.navLink}>
                <Compass size={20} /> Explore
              </Link>
            )}
            <Link href={isOrg ? "/dashboard/org/opportunities" : "/dashboard/student/applications"} className={styles.navLink}>
              <Briefcase size={20} /> {isOrg ? "Manage Listings" : "My Applications"}
            </Link>
            <Link href="/dashboard/messages" className={styles.navLink}>
              <MessageSquare size={20} /> Messages
            </Link>
          </div>

          <div className={styles.navGroup} style={{ marginTop: 'auto' }}>
            <Link href="/dashboard/settings" className={styles.navLink}>
              <Settings size={20} /> Settings
            </Link>
            <Link href="/api/auth/signout" className={styles.navLink}>
              <LogOut size={20} /> Logout
            </Link>
          </div>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <h2 className={styles.pageTitle}>Welcome back, {session.user?.name || 'User'}!</h2>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.userAvatar}>
              {session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
