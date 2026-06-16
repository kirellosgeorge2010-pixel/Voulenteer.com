import Link from "next/link";
import { PlusCircle, Users, Eye, Edit, Trash2 } from "lucide-react";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export default async function OrgDashboard() {
  const session = await getServerSession();
  // Assume we have the user ID in session, find the org
  // Mock org ID for now since we haven't implemented full onboarding
  const mockOrgId = "mock-org-123";

  // In reality: 
  // const user = await prisma.user.findUnique({ where: { email: session?.user?.email }, include: { organization: true }});
  
  const opportunities = await prisma.opportunity.findMany({
    // where: { orgId: mockOrgId }, // removed for mock
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { applications: true }
  });

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.mainFeed}>
        <div className={styles.headerRow}>
          <div>
            <h3>Your Active Listings</h3>
            <p className={styles.subtitle}>Manage your opportunities and review applicants.</p>
          </div>
          <Link href="/dashboard/org/opportunities/new" className="btn btn-primary">
            <PlusCircle size={18} /> Post New Opportunity
          </Link>
        </div>

        <div className={styles.tableCard}>
          {opportunities.length === 0 ? (
            <div className={styles.emptyState}>
              <p>You haven't posted any opportunities yet.</p>
              <Link href="/dashboard/org/opportunities/new" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Post Your First Opportunity
              </Link>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Opportunity Title</th>
                  <th>Category</th>
                  <th>Deadline</th>
                  <th>Applicants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opp) => (
                  <tr key={opp.id}>
                    <td className={styles.titleCell}>
                      <strong>{opp.title}</strong>
                      <span className={styles.metaText}>{opp.location || "Remote"}</span>
                    </td>
                    <td><span className="badge badge-purple">{opp.category}</span></td>
                    <td>{opp.deadline ? new Date(opp.deadline).toLocaleDateString() : "Ongoing"}</td>
                    <td>
                      <div className={styles.applicantBadge}>
                        <Users size={14} /> {opp.applications.length}
                      </div>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.iconBtn} title="View Details"><Eye size={16} /></button>
                        <button className={styles.iconBtn} title="Edit"><Edit size={16} /></button>
                        <button className={`${styles.iconBtn} ${styles.dangerBtn}`} title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={styles.sidePanel}>
        <div className={`card ${styles.summaryWidget}`}>
          <h3>Organization Summary</h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryNumber}>0</span>
              <span className={styles.summaryLabel}>Total Posts</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryNumber}>0</span>
              <span className={styles.summaryLabel}>Total Applicants</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryNumber}>0</span>
              <span className={styles.summaryLabel}>Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
