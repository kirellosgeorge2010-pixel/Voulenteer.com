import Link from "next/link";
import { Search, MapPin, Calendar, Clock, Star } from "lucide-react";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function StudentDashboard() {
  // In a real app, we'd fetch the user's actual interests and recommend based on that
  const recentOpportunities = await prisma.opportunity.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: { organization: true }
  });

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.mainFeed}>
        <div className={styles.feedHeader}>
          <h3>Recommended for You</h3>
          <Link href="/explore" className="btn btn-secondary">
            <Search size={16} /> Explore All
          </Link>
        </div>

        <div className={styles.opportunitiesList}>
          {recentOpportunities.length === 0 ? (
            <div className={`card ${styles.emptyState}`}>
              <p>No opportunities posted yet. Check back soon!</p>
            </div>
          ) : (
            recentOpportunities.map((opp) => (
              <div key={opp.id} className={`card ${styles.oppCard}`}>
                <div className={styles.oppHeader}>
                  <div className={styles.oppOrg}>
                    {opp.organization.logo ? (
                       // eslint-disable-next-line @next/next/no-img-element
                      <img src={opp.organization.logo} alt={opp.organization.name} className={styles.orgLogo} />
                    ) : (
                      <div className={styles.orgLogoPlaceholder}>{opp.organization.name.charAt(0)}</div>
                    )}
                    <div>
                      <h4>{opp.title}</h4>
                      <p className={styles.orgName}>{opp.organization.name}</p>
                    </div>
                  </div>
                  <div className="badge badge-purple">{opp.category}</div>
                </div>
                
                <p className={styles.oppDesc}>
                  {opp.description.length > 150 ? opp.description.substring(0, 150) + "..." : opp.description}
                </p>

                <div className={styles.oppMeta}>
                  <span><MapPin size={16} /> {opp.isRemote ? "Remote" : opp.location || "TBA"}</span>
                  {opp.deadline && <span><Clock size={16} /> Apply by {new Date(opp.deadline).toLocaleDateString()}</span>}
                </div>

                <div className={styles.oppFooter}>
                  <div className={styles.tags}>
                    {opp.isPaid && <span className="badge badge-green">Paid</span>}
                  </div>
                  <Link href={`/opportunities/${opp.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.sidePanel}>
        <div className={`card ${styles.profileWidget}`}>
          <h3>Your Profile</h3>
          <div className={styles.profileStats}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Applications</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Saved</span>
            </div>
          </div>
          <Link href="/dashboard/student/profile" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
            Complete Profile
          </Link>
        </div>

        <div className={`card ${styles.upcomingWidget}`}>
          <h3>Upcoming Deadlines</h3>
          <p className={styles.emptyText}>You have no upcoming deadlines.</p>
        </div>
      </div>
    </div>
  );
}
