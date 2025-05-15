import ComparisonCard from './ComparisonCard';
import DetailCard from './DetailCard';

const ResultsSection = ({ results, activeTab, setActiveTab, isLoading }) => {
  const tabs = [
    { id: 'linear', label: 'Linear', description: "Single-thread sequential processing" },
    { id: 'parallel', label: 'Parallel', description: "Multi-threaded on single machine" },
    { id: 'distributed_parallel', label: 'Distributed', description: "Across multiple machines" }
  ];

  const activeResults = results ? results[activeTab] : null;

  // Calculate performance improvements
  const performanceData = results ? {
    linear: results.linear.time_taken,
    parallel: results.parallel.time_taken,
    distributed: results.distributed_parallel.time_taken,
    parallelImprovement: ((results.linear.time_taken - results.parallel.time_taken) / results.linear.time_taken * 100).toFixed(0),
    distributedImprovement: ((results.linear.time_taken - results.distributed_parallel.time_taken) / results.linear.time_taken * 100).toFixed(0)
  } : null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Scraping Results</h2>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row border-b border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-6 py-4 text-left sm:text-center flex-1 ${activeTab === tab.id ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="font-medium text-lg">{tab.label}</div>
                <div className="text-sm">{tab.description}</div>
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p>Processing results...</p>
          </div>
        ) : (
          <>
            {/* Side-by-side comparison */}
            <div className="mb-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6">Performance Comparison</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ComparisonCard 
                  title="Linear" 
                  time={results?.linear.time_taken} 
                  emails={results?.linear.emails_found?.length} 
                  active={activeTab === 'linear'}
                  improvement={null}
                />
                <ComparisonCard 
                  title="Parallel" 
                  time={results?.parallel.time_taken} 
                  emails={results?.parallel.emails_found?.length} 
                  active={activeTab === 'parallel'}
                  improvement={performanceData?.parallelImprovement}
                />
                <ComparisonCard 
                  title="Distributed" 
                  time={results?.distributed_parallel.time_taken} 
                  emails={results?.distributed_parallel.emails_found?.length} 
                  active={activeTab === 'distributed_parallel'}
                  improvement={performanceData?.distributedImprovement}
                />
              </div>
              
              {/* Bar chart visualization */}
              <div className="mt-8">
                <div className="h-64 flex items-end gap-4">
                  <div className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg transition-all ${activeTab === 'linear' ? 'bg-purple-600' : 'bg-gray-700'}`}
                      style={{ height: `${(1 - results?.linear.time_taken / Math.max(results?.linear.time_taken, results?.parallel.time_taken, results?.distributed_parallel.time_taken)) * 90}%` }}
                    ></div>
                    <p className="mt-2">Linear</p>
                    <p className="text-sm text-gray-400">{results?.linear.time_taken.toFixed(2)}s</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg transition-all ${activeTab === 'parallel' ? 'bg-blue-600' : 'bg-gray-700'}`}
                      style={{ height: `${(1 - results?.parallel.time_taken / Math.max(results?.linear.time_taken, results?.parallel.time_taken, results?.distributed_parallel.time_taken)) * 90}%` }}
                    ></div>
                    <p className="mt-2">Parallel</p>
                    <p className="text-sm text-gray-400">{results?.parallel.time_taken.toFixed(2)}s</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg transition-all ${activeTab === 'distributed_parallel' ? 'bg-green-600' : 'bg-gray-700'}`}
                      style={{ height: `${(1 - results?.distributed_parallel.time_taken / Math.max(results?.linear.time_taken, results?.parallel.time_taken, results?.distributed_parallel.time_taken)) * 90}%` }}
                    ></div>
                    <p className="mt-2">Distributed</p>
                    <p className="text-sm text-gray-400">{results?.distributed_parallel.time_taken.toFixed(2)}s</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Emails found */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Emails Found ({activeResults?.emails_found?.length || 0})</h3>
                {activeResults?.emails_found?.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeResults.emails_found.map((email, index) => (
                        <div key={index} className="bg-gray-900 p-3 rounded-lg break-all text-sm">
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
                <h3 className="text-xl font-bold mb-4">Processing Details</h3>
                <div className="space-y-4">
                  <DetailCard 
                    title="Time Taken" 
                    value={`${activeResults?.time_taken?.toFixed(2)} seconds`} 
                    icon="⏱️"
                  />
                  <DetailCard 
                    title="Pages Scraped" 
                    value={activeResults?.pages_scraped} 
                    icon="📄"
                  />
                  <DetailCard 
                    title="Processing Type" 
                    value={activeResults?.processing_info?.type.replace('_', ' ')} 
                    icon="⚙️"
                  />
                  <DetailCard 
                    title="Machines Used" 
                    value={activeResults?.processing_info?.machines_used} 
                    icon="💻"
                  />
                  <DetailCard 
                    title="Threads Per Machine" 
                    value={activeResults?.processing_info?.threads_per_machine} 
                    icon="🧵"
                  />
                  <DetailCard 
                    title="Total Threads" 
                    value={activeResults?.processing_info?.total_threads} 
                    icon="🔢"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;