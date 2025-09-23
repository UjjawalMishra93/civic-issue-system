import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Location-Based Reporting",
      description: "Report issues with precise location data using our integrated mapping system.",
      color: "#2F5B8F",
    },
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Track the status of your reports from submission to resolution in real-time.",
      color: "#4CAF50",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Government-grade security ensures your data and reports are protected.",
      color: "#2F5B8F",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of citizens working together to improve our community.",
      color: "#4CAF50",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="features"
      className="py-20"
      style={{ backgroundColor: "#F0F2F5" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#2F5B8F" }}
          >
            Powerful Features for Civic Engagement
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "#616161" }}>
            Everything you need to report, track, and resolve civic issues
            efficiently.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-shadow group"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <CardHeader>
                <div
                  className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: "#FFFFFF" }} />
                </div>
                <CardTitle className="text-lg font-bold" style={{ color: "#212121" }}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed" style={{ color: "#616161" }}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
