import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="movie-detail-page">
        <div className="detail-hero skeleton" style={{ minHeight: "60vh" }}>
          {/* Skeleton for Backdrop */}
        </div>
        <div className="detail-content" style={{ padding: "0 48px", marginTop: "-150px", position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", gap: "40px" }}>
            <div className="skeleton" style={{ width: "300px", aspectRatio: "2/3", borderRadius: "10px", flexShrink: 0 }} />
            <div style={{ flex: 1, paddingTop: "40px" }}>
              <div className="skeleton" style={{ width: "60%", height: "48px", borderRadius: "8px", marginBottom: "16px" }} />
              <div className="skeleton" style={{ width: "40%", height: "24px", borderRadius: "4px", marginBottom: "32px" }} />
              <div className="skeleton" style={{ width: "100%", height: "120px", borderRadius: "8px", marginBottom: "24px" }} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
