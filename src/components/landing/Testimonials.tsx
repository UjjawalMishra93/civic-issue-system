import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This portal has completely changed how we interact with our local government. Reporting a pothole was incredibly easy, and I was amazed to see it fixed within a week!",
      author: "Sanjay",
      location: "Ranchi",
      avatar: "https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote: "As a city administrator, this portal has streamlined our entire workflow. We can now track, manage, and assign issues with an efficiency we never thought possible.",
      author: "Amit K.",
      location: "Jamshedpur",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote: "I love being able to see the positive changes in my neighborhood. It feels great to be part of the solution. Highly recommended for every concerned citizen.",
      author: "Sunita M.",
      location: "Dhanbad",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="testimonials"
      className="py-20"
      style={{ backgroundColor: "#FFFFFF" }}
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
            What Our Community is Saying
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "#616161" }}>
            Real stories from citizens and officials making a difference.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <CardContent className="pt-6">
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardHeader>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover bg-gray-200"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
