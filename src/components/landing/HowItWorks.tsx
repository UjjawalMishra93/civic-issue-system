import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
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
            How It Works
          </h2>
          <p className="text-xl" style={{ color: "#616161" }}>
            Three simple steps to make a difference in your community
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="text-center z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow"
                style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
              >
                1
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#212121" }}>
                Report the Issue
              </h3>
              <p className="text-sm" style={{ color: "#616161" }}>
                Take a photo, describe the problem, and pin the location on our map.
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow"
                style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
              >
                2
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#212121" }}>
                Track Progress
              </h3>
              <p className="text-sm" style={{ color: "#616161" }}>
                Monitor your report's status and receive updates as it's being
                addressed.
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow"
                style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
              >
                ✓
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#212121" }}>
                See Results
              </h3>
              <p className="text-sm" style={{ color: "#616161" }}>
                Get notified when the issue is resolved and see the positive
                impact you've made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
