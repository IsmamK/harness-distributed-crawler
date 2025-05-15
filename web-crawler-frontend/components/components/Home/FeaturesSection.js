const FeaturesSection = () => {
    const features = [
      {
        title: "Google Custom Search",
        description: "Leverage Google's powerful search to find relevant webpages",
        icon: "🔍"
      },
      {
        title: "Email Extraction",
        description: "BeautifulSoup + regex for accurate email harvesting",
        icon: "✉️"
      },
      {
        title: "Parallel Processing",
        description: "Multithreaded scraping on single machines",
        icon: "⚡"
      },
      {
        title: "Distributed Workers",
        description: "Celery workers across multiple machines",
        icon: "🌐"
      },
      {
        title: "Auto-scaling",
        description: "Dynamically adjust workers based on load",
        icon: "📈"
      },
      {
        title: "Containerized",
        description: "Docker + Kubernetes for deployment",
        icon: "📦"
      }
    ];
  
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all hover:scale-[1.02]">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;