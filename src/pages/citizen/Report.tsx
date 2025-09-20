import Header from "@/components/common/Header";
import IssueForm from "@/components/citizen/IssueForm";

const Report = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IssueForm />
      </main>
    </div>
  );
};

export default Report;