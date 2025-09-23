import { Link } from "react-router-dom";
import Button from "@/components/common/Button";

const CTA = () => {
  return (
    <section
      className="py-20"
      style={{
        background: "linear-gradient(120deg, #2F5B8F 60%, #4CAF50 100%)",
        color: "#FFFFFF",
      }}
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Your voice matters. Be the change your community needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth/signup">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8 bg-[#4CAF50] text-white hover:bg-[#388E3C] shadow-lg"
            >
              Create Account
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2F5B8F]"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
