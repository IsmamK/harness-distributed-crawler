import { useState } from 'react';
import Head from 'next/head';
import SpiderAnimation from './SpiderAnimation';
import IntroductionSection from './IntroductionSection';
import SearchSection from './SearchSection';
import FeaturesSection from './FeaturesSection';
import ArchitectureSection from './ArchitectureSection/ArchitectureCard';
import FooterSection from './FooterSection';
import ResultsSection from './ResultsSection/ResultsSection';

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

      {/* Search Section */}
      <SearchSection 
        query={query} 
        setQuery={setQuery} 
        handleSearch={handleSearch} 
        isLoading={isLoading} 
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Architecture Section */}
      <ArchitectureSection />

      {/* Results Section */}
      {results && (
        <ResultsSection 
          results={results} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isLoading={isLoading} 
        />
      )}

      {/* Footer */}
      <FooterSection />
    </div>
  );
}