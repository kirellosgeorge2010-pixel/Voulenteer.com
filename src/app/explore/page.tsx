import Link from "next/link";
import { Search, MapPin, Filter } from "lucide-react";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; location?: string };
}) {
  const query = searchParams.q || "";
  const category = searchParams.category || "";
  const location = searchParams.location || "";

  // Build the Prisma where clause based on filters
  const where: any = {};
  
  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }
  
  if (category) {
    where.category = category;
  }

  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }

  const opportunities = await prisma.opportunity.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { organization: true },
  });

  return (
    <div className={styles.exploreContainer}>
      <header className={styles.exploreHeader}>
        <div className="container">
          <h1>Explore Opportunities</h1>
          <p>Find the perfect volunteering role, internship, or event to move your future forward.</p>
          
          <div className={styles.searchBar}>
            <div className={styles.searchInput}>
              <Search size={20} className={styles.searchIcon} />
              <input type="text" placeholder="Search for opportunities..." defaultValue={query} />
            </div>
            <div className={styles.searchInput}>
              <MapPin size={20} className={styles.searchIcon} />
              <input type="text" placeholder="Location or Remote" defaultValue={location} />
            </div>
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </header>

      <div className={`container ${styles.resultsContainer}`}>
        <aside className={styles.filtersSidebar}>
          <div className={styles.filterSection}>
            <h4><Filter size={16} /> Filters</h4>
          </div>
          
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Category</label>
            <select className={styles.select} defaultValue={category}>
              <option value="">All Categories</option>
              <option value="Volunteering">Volunteering</option>
              <option value="Internship">Internships</option>
              <option value="Workshop">Workshops</option>
              <option value="Competition">Competitions</option>
              <option value="Conference">Conferences</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Type</label>
            <div className={styles.checkboxGroup}>
              <label><input type="checkbox" /> Remote Only</label>
              <label><input type="checkbox" /> Paid Only</label>
            </div>
          </div>
        </aside>

        <main className={styles.resultsMain}>
          <div className={styles.resultsHeader}>
            <p>Showing <strong>{opportunities.length}</strong> opportunities</p>
          </div>

          <div className={styles.resultsGrid}>
            {opportunities.length === 0 ? (
              <div className={styles.emptyResults}>
                <h3>No opportunities found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            ) : (
              opportunities.map((opp) => (
                <Link href={`/opportunities/${opp.id}`} key={opp.id} className={`card ${styles.oppCard}`}>
                  <div className={styles.cardTop}>
                    <div className={styles.orgInfo}>
                      {opp.organization.logo ? (
                         // eslint-disable-next-line @next/next/no-img-element
                        <img src={opp.organization.logo} alt={opp.organization.name} className={styles.orgLogo} />
                      ) : (
                        <div className={styles.orgLogoPlaceholder}>{opp.organization.name.charAt(0)}</div>
                      )}
                      <div>
                        <h3 className={styles.oppTitle}>{opp.title}</h3>
                        <p className={styles.orgName}>{opp.organization.name}</p>
                      </div>
                    </div>
                    <span className="badge badge-purple">{opp.category}</span>
                  </div>
                  
                  <p className={styles.oppDesc}>
                    {opp.description.length > 120 ? opp.description.substring(0, 120) + "..." : opp.description}
                  </p>

                  <div className={styles.cardBottom}>
                    <span className={styles.meta}><MapPin size={14} /> {opp.isRemote ? "Remote" : opp.location || "TBA"}</span>
                    {opp.isPaid && <span className="badge badge-green">Paid</span>}
                  </div>
                </Link>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
