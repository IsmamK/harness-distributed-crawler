const IntroductionSection = () => {
    return (
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              HARNESS
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              High-performance Asynchronous Retrieval and Navigation for Email & Site Scraping
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About the Project</h2>
              <p className="text-gray-300 mb-4">
                HARNESS is a distributed email scraping system designed to extract email addresses from web pages at scale. 
                It combines multiple scraping approaches to provide performance comparisons and optimize resource utilization.
              </p>
              <p className="text-gray-300 mb-4">
                The system uses Google Custom Search API to find relevant web pages, then applies sophisticated email 
                extraction techniques to harvest contact information efficiently.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-blue-400">Django</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-green-400">Celery</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-red-400">Redis</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-yellow-400">Docker</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-purple-400">Kubernetes</span>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Scraping Approaches</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-400 mb-1">Linear Scraping</h4>
                  <p className="text-gray-300 text-sm">Traditional sequential processing for baseline measurements</p>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-bold text-purple-400 mb-1">Parallel Scraping</h4>
                  <p className="text-gray-300 text-sm">Single-machine multithreading for improved performance</p>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-green-400 mb-1">Distributed Scraping</h4>
                  <p className="text-gray-300 text-sm">Celery workers across multiple machines for maximum throughput</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default IntroductionSection;