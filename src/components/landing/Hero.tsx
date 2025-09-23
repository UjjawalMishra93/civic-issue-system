import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const Hero = () => {
  const statsData = [
    { number: 15000, label: "Issues Resolved" },
    { number: 50000, label: "Active Citizens" },
    { number: 98, label: "Resolution Rate", suffix: "%" },
    { number: 24, label: "System Availability", suffix: "/7" },
  ];
  const [stats, setStats] = useState([0, 0, 0, 0]);
  useEffect(() => {
    // Simple counter animation
    statsData.forEach((stat, i) => {
      let start = 0;
      const end = stat.number;
      const duration = 800;
      const step = Math.ceil(end / (duration / 20));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setStats((prev) => {
          const copy = [...prev];
          copy[i] = start;
          return copy;
        });
      }, 20);
    });
  }, []);

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "#F0F2F5" }}
    >
      {/* Example animated gradient background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(120deg, #2F5B8F 0%, #4CAF50 100%)",
          opacity: 0.08,
        }}
      />
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <Badge
          className="mb-4"
          style={{ backgroundColor: "#4CAF50", color: "#FFFFFF", borderColor: "#4CAF50" }}
        >
          🚀 Trusted by 50,000+ Citizens
        </Badge>
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ color: "#2F5B8F" }}
        >
          Report Civic Issues.<br />
          <span style={{ color: "#4CAF50" }}>Build Better Communities.</span>
        </h1>
        <p
          className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
          style={{ color: "#212121" }}
        >
          Empower citizens to report civic issues, track progress, and create
          positive change in their communities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/auth/signup">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8 bg-[#2F5B8F] text-white hover:bg-[#1B3556] shadow-lg"
            >
              Make an Impact Now
            </Button>
          </Link>
          <a href="#features">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto px-8 bg-[#4CAF50] text-white hover:bg-[#388E3C] shadow-lg"
            >
              Learn More
            </Button>
          </a>
        </div>
        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#2F5B8F" }}
              >
                {stats[index]}
                {stat.suffix ? stat.suffix : "+"}
              </div>
              <div className="text-sm" style={{ color: "#616161" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
