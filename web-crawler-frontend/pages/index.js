import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('linear');
  const [showSpider, setShowSpider] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setShowSpider(true);
    try {
      const response = await fetch('http://localhost:8000/api/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowSpider(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Head>
        <title>HARNESS - High-performance Email Scraping</title>
        <meta name="description" content="Distributed email scraping system" />
      </Head>

      {/* Spider animation */}
      {showSpider && <SpiderAnimation />}

      {/* Introduction Section */}
      <IntroductionSection />
     
      <ScrapingApproachDiagram />

         {/* Features Section */}
         <FeaturesSection />
      <UseCasesSection />
      {/* Search Section */}
      <SearchSection 
        query={query} 
        setQuery={setQuery} 
        handleSearch={handleSearch} 
        isLoading={isLoading} 
      />
       {/* Results Section */}
       {results && (
        <ResultsSection 
          results={results} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isLoading={isLoading} 
        />
      )}

   
      {/* Architecture Section */}
      <ArchitectureSection />

     

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

// Spider Animation Component
const SpiderAnimation = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className="absolute h-1 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-200"
        style={{ width: `${position}%` }}
      ></div>
      <div 
        className="absolute top-0 transform -translate-y-1/2 text-purple-400"
        style={{ left: `${position}%` }}
      >
        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3-3m0 0l3-3m-3 3h12" />
        </svg>
      </div>
    </div>
  );
};

// Introduction Component
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
// Features Component
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

// Enhanced Search Component with visual appeal
const SearchSection = ({ query, setQuery, handleSearch, isLoading }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            Discover Hidden Emails
          </h2>
          <p className="text-gray-400">Powerful email scraping with Google search operators</p>
        </div>
        
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="query" className="block text-sm font-medium text-gray-300">
                Search Query
              </label>
              <span className="text-xs bg-gray-800 text-purple-400 px-2 py-1 rounded-full">
                Pro Tip
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Example: 'site:example.com email'"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-white transition-all duration-200"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-400 italic">
              Try operators like <code className="bg-gray-800 px-1 rounded">site:</code>, <code className="bg-gray-800 px-1 rounded">intext:</code>, or <code className="bg-gray-800 px-1 rounded">filetype:</code>
            </p>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-xs mx-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-600 hover:to-blue-500 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning the Web...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Find Emails Now
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// Results Component
const ResultsSection = ({ results, activeTab, setActiveTab, isLoading }) => {
  const tabs = [
    { id: 'linear', label: 'Linear', description: "Single-thread sequential", icon: "➡️" },
    { id: 'parallel', label: 'Parallel', description: "Multi-threaded single machine", icon: "⏩" },
    { id: 'distributed_parallel', label: 'Distributed', description: "Across multiple machines", icon: "🌐" }
  ];

  const activeResults = results ? results[activeTab] : null;

  // Calculate performance improvements
  const performanceData = results ? {
    linear: results.linear.time_taken,
    parallel: results.parallel.time_taken,
    distributed: results.distributed_parallel.time_taken,
    parallelImprovement: ((results.linear.time_taken - results.parallel.time_taken) / results.linear.time_taken * 100).toFixed(0),
    distributedImprovement: ((results.linear.time_taken - results.distributed_parallel.time_taken) / results.linear.time_taken * 100).toFixed(0),
    parallelVsDistributed: ((results.parallel.time_taken - results.distributed_parallel.time_taken) / results.parallel.time_taken * 100).toFixed(0)
  } : null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Scraping Performance Comparison</h2>
        
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row border-b border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-6 py-4 text-left sm:text-center flex-1 transition-all ${activeTab === tab.id ? 
                  'text-white bg-gray-800 border-t-2 border-purple-500' : 
                  'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="font-medium text-lg flex items-center justify-center gap-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                <div className="text-sm mt-1">{tab.description}</div>
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-white">Processing results...</p>
          </div>
        ) : (
          <>
            {/* Performance Highlights */}
            {performanceData && (
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-600">
                  <h3 className="text-gray-400 text-sm">Baseline (Linear)</h3>
                  <p className="text-2xl font-bold text-white">{performanceData.linear.toFixed(2)}s</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-gray-400 text-sm">Parallel Speedup</h3>
                  <p className="text-2xl font-bold text-white">{performanceData.parallelImprovement}% faster</p>
                  <p className="text-sm text-gray-400">{performanceData.parallel.toFixed(2)}s</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-600">
                  <h3 className="text-gray-400 text-sm">Distributed Speedup</h3>
                  <p className="text-2xl font-bold text-white">{performanceData.distributedImprovement}% faster</p>
                  <p className="text-sm text-gray-400">{performanceData.distributed.toFixed(2)}s</p>
                </div>
              </div>
            )}

            {/* Side-by-side comparison */}
            <div className="mb-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-white">Approach Comparison</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="pb-4 text-gray-400 font-medium">Metric</th>
                      <th className="pb-4 text-gray-400 font-medium text-center">Linear</th>
                      <th className="pb-4 text-gray-400 font-medium text-center">Parallel</th>
                      <th className="pb-4 text-gray-400 font-medium text-center">Distributed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 text-white">Time Taken</td>
                      <td className={`py-4 text-center ${activeTab === 'linear' ? 'text-purple-500 font-bold' : 'text-gray-300'}`}>
                        {results?.linear.time_taken.toFixed(2)}s
                      </td>
                      <td className={`py-4 text-center ${activeTab === 'parallel' ? 'text-blue-500 font-bold' : 'text-gray-300'}`}>
                        {results?.parallel.time_taken.toFixed(2)}s
                        <div className="text-xs text-green-500 mt-1">+{performanceData?.parallelImprovement}% faster</div>
                      </td>
                      <td className={`py-4 text-center ${activeTab === 'distributed_parallel' ? 'text-green-500 font-bold' : 'text-gray-300'}`}>
                        {results?.distributed_parallel.time_taken.toFixed(2)}s
                        <div className="text-xs text-green-500 mt-1">+{performanceData?.distributedImprovement}% faster</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 text-white">Emails Found</td>
                      <td className="py-4 text-center text-gray-300">{results?.linear.emails_found?.length}</td>
                      <td className="py-4 text-center text-gray-300">{results?.parallel.emails_found?.length}</td>
                      <td className="py-4 text-center text-gray-300">{results?.distributed_parallel.emails_found?.length}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 text-white">Pages Scraped</td>
                      <td className="py-4 text-center text-gray-300">{results?.linear.pages_scraped}</td>
                      <td className="py-4 text-center text-gray-300">{results?.parallel.pages_scraped}</td>
                      <td className="py-4 text-center text-gray-300">{results?.distributed_parallel.pages_scraped}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-white">Resources Used</td>
                      <td className="py-4 text-center text-gray-300">1 thread</td>
                      <td className="py-4 text-center text-gray-300">
                        {results?.parallel.processing_info?.total_threads} threads
                        <br/>(1 machine)
                      </td>
                      <td className="py-4 text-center text-gray-300">
                        {results?.distributed_parallel.processing_info?.total_threads} threads
                        <br/>({results?.distributed_parallel.processing_info?.machines_used} machines)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Bar chart visualization */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-white">Performance Visualization</h4>
                <div className="h-64 flex items-end gap-4">
                  <div className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${activeTab === 'linear' ? 'bg-purple-600' : 'bg-gray-700'}`}
                      style={{ height: `${100 - (results?.linear.time_taken / Math.max(results?.linear.time_taken, results?.parallel.time_taken, results?.distributed_parallel.time_taken)) * 90}%` }}
                    ></div>
                    <p className="mt-2 text-white">Linear</p>
                    <p className="text-sm text-gray-400">{results?.linear.time_taken.toFixed(2)}s</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${activeTab === 'parallel' ? 'bg-blue-600' : 'bg-gray-700'}`}
                      style={{ height: `${100 - (results?.parallel.time_taken / Math.max(results?.linear.time_taken, results?.parallel.time_taken, results?.distributed_parallel.time_taken)) * 90}%` }}
                    ></div>
                    <p className="mt-2 text-white">Parallel</p>
                    <p className="text-sm text-gray-400">{results?.parallel.time_taken.toFixed(2)}s</p>
                    <div className="text-xs text-blue-400 mt-1">+{performanceData?.parallelImprovement}%</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${activeTab === 'distributed_parallel' ? 'bg-green-600' : 'bg-gray-700'}`}
                      style={{ height: `${100 - (results?.distributed_parallel.time_taken / Math.max(results?.linear.time_taken, results?.parallel.time_taken, results?.distributed_parallel.time_taken)) * 90}%` }}
                    ></div>
                    <p className="mt-2 text-white">Distributed</p>
                    <p className="text-sm text-gray-400">{results?.distributed_parallel.time_taken.toFixed(2)}s</p>
                    <div className="text-xs text-green-400 mt-1">+{performanceData?.distributedImprovement}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Emails found */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Emails Found</h3>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    {activeResults?.emails_found?.length || 0} emails
                  </span>
                </div>
                {activeResults?.emails_found?.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeResults.emails_found.map((email, index) => (
                        <div key={index} className="bg-gray-900 p-3 rounded-lg break-all text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                          {email}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">No emails found for this search.</p>
                )}
              </div>

              {/* Processing details */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-white">Execution Details</h3>
                <div className="space-y-4">
                  <DetailCard 
                    title="Processing Type" 
                    value={activeResults?.processing_info?.type.replace('_', ' ')} 
                    icon="⚙️"
                    highlight={activeTab}
                  />
                  <DetailCard 
                    title="Time Taken" 
                    value={`${activeResults?.time_taken?.toFixed(2)} seconds`} 
                    icon="⏱️"
                    highlight={activeTab}
                  />
                  <DetailCard 
                    title="Pages Scraped" 
                    value={activeResults?.pages_scraped} 
                    icon="📄"
                    highlight={activeTab}
                  />
                  <DetailCard 
                    title="Total Threads" 
                    value={activeResults?.processing_info?.total_threads} 
                    icon="🧵"
                    highlight={activeTab}
                  />
                  <DetailCard 
                    title="Machines Used" 
                    value={activeResults?.processing_info?.machines_used} 
                    icon="💻"
                    highlight={activeTab}
                  />
                </div>

                {/* Machine Details Section */}
                {activeResults?.processing_info?.machine_details && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3 text-white">Machine Distribution</h4>
                    <div className="space-y-3">
                      {activeResults.processing_info.machine_details.map((machine, index) => (
                        <div key={index} className="bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-400">Hostname</p>
                              <p className="font-mono text-sm text-white">{machine.hostname}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Threads</p>
                              <p className="text-white">{machine.threads}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">URLs Processed</p>
                              <p className="text-white">{machine.urls_processed}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Workload</p>
                              <p className="text-white">
                                {activeResults.processing_info.machines_used > 1 ? 
                                  `${((machine.urls_processed / activeResults.pages_scraped) * 100).toFixed(0)}%` : 
                                  '100%'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};


// Architecture Component
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

const ArchitectureCard = ({ title, items, color }) => {
  return (
    <div className={`bg-gray-900 p-6 rounded-xl border-l-4 ${color}`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-3 text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};



// Helper components
const ComparisonCard = ({ title, time, emails, active, improvement }) => {
  const activeClasses = active ? 'border-purple-500 bg-gray-900' : 'border-gray-700';
  
  return (
    <div className={`border rounded-lg p-4 transition-all ${activeClasses}`}>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <div className="space-y-2">
        <p><span className="text-gray-400">Time:</span> {time ? `${time.toFixed(2)}s` : '-'}</p>
        <p><span className="text-gray-400">Emails:</span> {emails || '0'}</p>
        {improvement && (
          <p className="text-green-400">+{improvement}% faster than linear</p>
        )}
      </div>
    </div>
  );
};

const DetailCard = ({ title, value, icon, highlight }) => {
  const highlightColor = {
    'linear': 'border-purple-500',
    'parallel': 'border-blue-500',
    'distributed_parallel': 'border-green-500'
  }[highlight];

  return (
    <div className={`bg-gray-900 p-4 rounded-lg border-l-4 ${highlightColor || 'border-gray-700'}`}>
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <div>
          <h4 className="text-gray-400 text-sm">{title}</h4>
          <p className="text-white font-medium">{value}</p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

const ScrapingApproachDiagram = () => {
  // Sample performance data (ms per 100 URLs)
  const performanceData = [
    { approach: 'Linear', speed: 12000, cpu: '25%', scalability: 'Low' },
    { approach: 'Parallel', speed: 3500, cpu: '95%', scalability: 'Medium' },
    { approach: 'Distributed', speed: 800, cpu: '40% per worker', scalability: 'High' }
  ];

  return (
    <section className="py-16 px-4 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Scraping Architecture Comparison
        </h2>
        <p className="text-center text-slate-300 mb-12 max-w-3xl mx-auto">
          Three approaches to demonstrate performance evolution from baseline to distributed systems
        </p>

        {/* Interactive Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Linear */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/30 hover:border-blue-400 transition-all">
            <div className="flex flex-col items-center mb-6">
              <div className="w-full h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4"></div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Linear</h3>
                <p className="text-sm text-slate-300">Sequential Processing</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Main Thread</span>
                <span className="text-blue-400">→</span>
              </div>
              {[1, 2, 3].map((item) => (
                <div key={item} className="ml-6 pl-4 border-l-2 border-blue-500/30 py-2">
                  <span className="text-slate-300">URL {item}</span>
                  <span className="block text-xs text-slate-500 mt-1">Processed sequentially</span>
                </div>
              ))}
            </div>
          </div>

          {/* Parallel */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all">
            <div className="flex flex-col items-center mb-6">
              <div className="w-full h-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mb-4"></div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Parallel</h3>
                <p className="text-sm text-slate-300">ThreadPool Execution</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-center text-slate-400 mb-2">Main Thread</div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((thread) => (
                  <div key={thread} className="bg-purple-900/30 rounded p-2 border border-purple-500/20">
                    <div className="text-xs text-purple-300 mb-1">Thread {thread}</div>
                    <div className="text-xs text-slate-400">URL {thread}</div>
                  </div>
                ))}
              </div>
              <div className="text-center text-xs text-slate-500 mt-2">
                Concurrent processing on single machine
              </div>
            </div>
          </div>

          {/* Distributed */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all">
            <div className="flex flex-col items-center mb-6">
              <div className="w-full h-2 bg-gradient-to-r from-green-500 to-green-700 rounded-full mb-4"></div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-400 mb-2">Distributed</h3>
                <p className="text-sm text-slate-300">Celery + Redis</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center px-4 py-2 bg-red-900/20 rounded-lg border border-red-500/30 text-sm">
                Redis Task Queue
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Worker 1', 'Worker 2', 'Worker 3'].map((worker) => (
                  <div key={worker} className="bg-green-900/20 rounded p-2 border border-green-500/30">
                    <div className="text-xs text-green-300">{worker}</div>
                    <div className="text-xs text-slate-400">Batch processing</div>
                  </div>
                ))}
              </div>
              <div className="text-center text-xs text-slate-500">
                Cross-machine parallel execution
              </div>
            </div>
          </div>
        </div>


        {/* Key Takeaways */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/20">
            <h4 className="font-bold text-blue-400 mb-3">Linear Scraping</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Simple to implement</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>No parallelization overhead</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Good for small-scale testing</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/20">
            <h4 className="font-bold text-purple-400 mb-3">Parallel Scraping</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>4-5x faster than linear</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Optimal for single-server setups</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Limited by machine resources</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/20">
            <h4 className="font-bold text-green-400 mb-3">Distributed Scraping</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>15x+ faster than linear</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Auto-scaling capabilities</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Kubernetes-ready architecture</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const UseCasesSection = () => {
  const useCases = [
    {
      title: "Lead Generation",
      icon: (
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: "Extract sales leads from industry directories, forums, and professional networks at scale for targeted outreach campaigns.",
      benefits: [
        "500-1000% more leads than manual searching",
        "Fresh contact data updated daily",
        "Filter by domain/industry"
      ]
    },
    {
      title: "Academic Research",
      icon: (
        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: "Collect contact information for large-scale surveys, expert interviews, or citation networks in research projects.",
      benefits: [
        "Build comprehensive scholar databases",
        "Identify subject matter experts",
        "Track research collaboration networks"
      ]
    },
    {
      title: "Competitor Intelligence",
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Monitor competitor partnerships by analyzing contact patterns and organizational relationships.",
      benefits: [
        "Discover hidden business relationships",
        "Track executive movements",
        "Map industry ecosystems"
      ]
    },
    {
      title: "Fraud Detection",
      icon: (
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      description: "Identify suspicious patterns in web-scraped contact data to detect phishing operations or fake profiles.",
      benefits: [
        "Cluster similar suspicious addresses",
        "Track scam operation expansions",
        "Build domain reputation databases"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            Why HARNESS Matters
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transforming raw web data into actionable contact intelligence at unprecedented scale
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Scale</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Process <span className="font-bold text-blue-600 dark:text-blue-400">millions of pages daily</span> across distributed workers, 
              compared to manual methods limited to hundreds.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Precision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our <span className="font-bold text-purple-600 dark:text-purple-400">hybrid extraction engine</span> combines 
              regex patterns for 92%+ accuracy.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Adaptability</h3>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-bold text-green-600 dark:text-green-400">Auto-scaling infrastructure</span> adjusts to 
              website anti-scraping measures and workload demands in real-time.
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{useCase.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{useCase.description}</p>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-500 mr-2">✓</span>
                          <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6 mt-12">
          <div className="flex items-start">
            <div className="mr-4 text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Ethical & Compliant</h4>
              <p className="text-blue-700 dark:text-blue-300">
                HARNESS is designed for public data collection with built-in rate limiting, 
                robots.txt compliance, and optional data anonymization to meet GDPR/CCPA requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Footer Component
const FooterSection = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            HARNESS
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            High-performance Asynchronous Retrieval and Navigation for Email & Site Scraping
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HARNESS Project. Built with Django, Celery, Redis, and Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};