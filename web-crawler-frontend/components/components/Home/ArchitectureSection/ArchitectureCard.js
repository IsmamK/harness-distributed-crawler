import ArchitectureCard from "./ArchitectureCard";

const ArchitectureSection = () => {
  const components = [
    { name: "Next.js UI", color: "bg-blue-500", position: "top-[15%] left-[15%]" },
    { name: "Django API", color: "bg-purple-500", position: "top-[15%] right-[15%]" },
    { name: "Redis", color: "bg-red-500", position: "bottom-[15%] left-[15%]" },
    { name: "Celery Workers", color: "bg-green-500", position: "bottom-[15%] right-[15%]" },
    { name: "Google CSE", color: "bg-yellow-500", position: "top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2" }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">System Architecture</h2>

        <div className="relative h-96 bg-gray-900 rounded-xl p-8 mb-12 border border-gray-700">
          {components.map((comp, index) => (
            <div key={index} className={`absolute ${comp.position} ${comp.color} rounded-lg p-3 w-28 text-center text-sm font-medium`}>
              {comp.name}
            </div>
          ))}
          
          {/* Connection lines */}
          <div className="absolute top-[25%] left-[25%] right-[25%] h-px bg-gray-600"></div>
          <div className="absolute bottom-[25%] left-[25%] right-[25%] h-px bg-gray-600"></div>
          <div className="absolute left-[25%] top-[25%] bottom-[25%] w-px bg-gray-600"></div>
          <div className="absolute right-[25%] top-[25%] bottom-[25%] w-px bg-gray-600"></div>
          <div className="absolute top-[50%] left-[30%] right-[30%] h-px bg-gray-600"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ArchitectureCard
            title="Frontend Layer"
            items={[
              "Next.js React application",
              "Tailwind CSS styling",
              "Interactive visualizations",
              "Real-time results display"
            ]}
            color="border-blue-500"
          />
          <ArchitectureCard 
            title="Processing Layer"
            items={[
              "Django REST API",
              "Celery task distribution",
              "Redis message broker",
              "Google Search API"
            ]}
            color="border-purple-500"
          />
          <ArchitectureCard 
            title="Infrastructure Layer"
            items={[
              "Docker containers",
              "Kubernetes orchestration",
              "Render.com hosting",
              "Auto-scaling workers"
            ]}
            color="border-green-500"
          />
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;