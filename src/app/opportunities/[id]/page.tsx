import { notFound } from "next/navigation";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { MapPin, Calendar, Clock, Briefcase, Globe, ChevronLeft } from "lucide-react";
import styles from "./page.module.css";

const prisma = new PrismaClient();

export default async function OpportunityDetail({ params }: { params: { id: string } }) {
  const opp = await prisma.opportunity.findUnique({
    where: { id: params.id },
    include: { organization: true }
  });

  if (!opp) {
    notFound();
  }

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        <Link href="/explore" className={styles.backLink}>
          <ChevronLeft size={16} /> Back to Explore
        </Link>
        
        <div className={styles.layoutGrid}>
          <main className={styles.mainContent}>
            <header className={`card ${styles.headerCard}`}>
              <div className={styles.headerTop}>
                {opp.organization.logo ? (
                   // eslint-disable-next-line @next/next/no-img-element
                  <img src={opp.organization.logo} alt={opp.organization.name} className={styles.orgLogo} />
                ) : (
                  <div className={styles.orgLogoPlaceholder}>{opp.organization.name.charAt(0)}</div>
                )}
                <div className={styles.titleArea}>
                  <h1>{opp.title}</h1>
                  <p className={styles.orgName}>{opp.organization.name}</p>
                </div>
              </div>

              <div className={styles.metaRow}>
                <span className="badge badge-purple">{opp.category}</span>
                <span className={styles.metaItem}><MapPin size={16} /> {opp.isRemote ? "Remote" : opp.location || "TBA"}</span>
                {opp.isPaid && <span className="badge badge-green">Paid Position</span>}
                <span className={styles.metaItem}><Clock size={16} /> Posted {new Date(opp.createdAt).toLocaleDateString()}</span>
              </div>
            </header>

            <div className={`card ${styles.descriptionCard}`}>
              <h2>About this Opportunity</h2>
              <div className={styles.prose}>
                <p>{opp.description}</p>
                
                {opp.requirements && (
                  <>
                    <h3>Requirements</h3>
                    <p>{opp.requirements}</p>
                  </>
                )}
              </div>
            </div>
          </main>

          <aside className={styles.sidebar}>
            <div className={`card ${styles.applyCard}`}>
              <h3>Ready to apply?</h3>
              {opp.deadline && (
                <p className={styles.deadlineInfo}>
                  <Calendar size={16} /> Deadline: {new Date(opp.deadline).toLocaleDateString()}
                </p>
              )}
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                Apply Now
              </button>
            </div>

            <div className={`card ${styles.orgCard}`}>
              <h3>About the Organization</h3>
              <div className={styles.orgCardHeader}>
                <div className={styles.orgLogoPlaceholderSmall}>{opp.organization.name.charAt(0)}</div>
                <strong>{opp.organization.name}</strong>
              </div>
              <p className={styles.orgDesc}>
                {opp.organization.description || "An organization making a difference on Volunext."}
              </p>
              {opp.organization.website && (
                <a href={opp.organization.website} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                  <Globe size={16} /> Visit Website
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
