import { motion } from "framer-motion";

const BeforeAfter = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="before-after"
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5B8F]">
            Real Results in Our Community
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            From reported to resolved. See the impact of citizen action.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <img
              src="/pathhole.png"
              alt="Pothole before repair"
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-gray-100">
              <p className="font-bold text-center text-gray-700">Before</p>
            </div>
          </div>
          <div className="rounded-lg shadow-lg overflow-hidden">
            <img
              src="/pathhole_after.png"
              alt="Road after repair"
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-gray-100">
              <p className="font-bold text-center text-gray-700">After</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BeforeAfter;
