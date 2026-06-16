import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, Users, Trophy, Calendar, Presentation, Sparkles, Building2, MapPin, Search } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      {/* Navigation Bar (Mocked for Landing) */}
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles className="text-accent" /> Volunext
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/auth/login" style={{ fontWeight: 500 }}>Log In</Link>
          <Link href="/auth/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container animate-fade-in ${styles.heroContent}`}>
          <div className="badge badge-purple" style={{ marginBottom: '1.5rem' }}>
            ✨ The future of opportunity discovery
          </div>
          <h1 className={styles.title}>
            Find opportunities that actually move your future forward.
          </h1>
          <p className={styles.subtitle}>
            Stop scrolling social media. Discover high-quality volunteering, internships, workshops, and competitions tailored for your career goals in one place.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/explore" className="btn btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1.1rem' }}>
              Explore Opportunities <ArrowRight size={18} />
            </Link>
            <Link href="/org/onboarding" className="btn btn-secondary" style={{ padding: '0.875rem 1.75rem', fontSize: '1.1rem' }}>
              Post an Event
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsWrap}>
        <div className={`container ${styles.statsGrid}`}>
          <div>
            <div className={styles.statNumber}>10k+</div>
            <div className={styles.statLabel}>Active Events</div>
          </div>
          <div>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Organizations</div>
          </div>
          <div>
            <div className={styles.statNumber}>50k+</div>
            <div className={styles.statLabel}>Students</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore by Category</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Find exactly what you need to build your resume.</p>
        </div>
        
        <div className={styles.categoriesGrid}>
          {[
            { icon: Users, title: "Volunteering", desc: "Give back to the community" },
            { icon: Briefcase, title: "Internships", desc: "Gain professional experience" },
            { icon: Presentation, title: "Workshops", desc: "Learn new practical skills" },
            { icon: Trophy, title: "Competitions", desc: "Test your abilities and win" },
            { icon: GraduationCap, title: "Conferences", desc: "Network with industry leaders" },
            { icon: Calendar, title: "Community Events", desc: "Connect with like-minded peers" },
          ].map((cat, i) => (
            <div key={i} className={`card ${styles.categoryCard}`}>
              <div className={styles.categoryIcon}>
                <cat.icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>{cat.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section (Mock) */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Opportunities</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Hand-picked opportunities starting soon.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {[1, 2, 3].map((item) => (
            <div key={item} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '160px', background: 'var(--bg-tertiary)', position: 'relative' }}>
                 {/* Placeholder banner */}
                 <div style={{ position: 'absolute', top: '1rem', right: '1rem' }} className="badge badge-green">Open</div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <Building2 size={16} /> TechCorp Inc.
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Summer Software Engineering Intern</h3>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}><MapPin size={16} /> Remote</span>
                  <span style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}><Calendar size={16} /> Starts June</span>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <Link href={`/opportunities/mock-${item}`} className="btn btn-secondary" style={{ width: '100%' }}>View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/explore" className="btn btn-primary"><Search size={18} /> View All Opportunities</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerCol}>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sparkles className="text-accent" /> Volunext
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Connecting ambitious youth with opportunities that accelerate their future.
            </p>
          </div>
          <div className={styles.footerCol}>
            <h4>Platform</h4>
            <ul>
              <li><Link href="/explore">Explore</Link></li>
              <li><Link href="/organizations">Organizations</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/guidelines">Community Guidelines</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className={`container ${styles.footerBottom}`}>
          &copy; {new Date().getFullYear()} Volunext. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
