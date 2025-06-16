import React, { useState, useMemo, useEffect } from 'react';
import { Search, Grid, List, Moon, Sun, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import './App.css';

// Import the data from the processed Excel file
import neuralNetworksData from './excel_data.json';

// Monetag components
import MonetagScript from './components/MonetagScript';
import AdDelayManager from './components/AdDelayManager';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Display 12 items per page

  // Debug: Check if data is loaded
  console.log('Neural networks data loaded:', neuralNetworksData?.length || 0, 'items');

  // Get unique categories from the data
  const categories = useMemo(() => {
    if (!neuralNetworksData || !Array.isArray(neuralNetworksData)) {
      console.error('Neural networks data is not available or not an array');
      return [];
    }
    const cats = [...new Set(neuralNetworksData.map(item => item['Категория']))];
    return cats.sort();
  }, []);

  // Filter data based on search and category
  const filteredData = useMemo(() => {
    if (!neuralNetworksData || !Array.isArray(neuralNetworksData)) {
      return [];
    }
    return neuralNetworksData.filter(item => {
      const matchesSearch = item['Название'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item['Описание'].toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || item['Категория'] === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Show loading state if data is not available
  if (!neuralNetworksData || !Array.isArray(neuralNetworksData)) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Բեռնվում են տվյալները...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  🧠 Նեյրոցանցերի Հարթակ
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title={viewMode === 'grid' ? 'Ցանկի տեսք' : 'Ցանցի տեսք'}
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Մուգ ռեժիմ"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Բացահայտեք AI-ի ապագան
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Ամբողջական հավաքածու 2000+ նեյրոցանցերի և արհեստական բանականության գործիքների՝ 218 կատեգորիայով։ 
            Գտեք ձեր նախագծի համար կատարյալ լուծումը։
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-200">2000+</div>
              <div className="text-lg">Նեյրոցանցեր</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-200">218</div>
              <div className="text-lg">Կատեգորիաներ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-indigo-200">100%</div>
              <div className="text-lg">Անվճար հասանելիություն</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white dark:bg-gray-800 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Որոնել նեյրոցանցեր, նկարագրություն..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Բոլոր կատեգորիաները</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Գտնվել է {filteredData.length} արդյունք {neuralNetworksData.length} նեյրոցանցից
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results */}
        {paginatedData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Արդյունքներ չեն գտնվել
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Փորձեք փոխել որոնման պարամետրերը կամ ընտրել այլ կատեգորիա
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedData.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {item['Категория']}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item['Название']}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {item['Описание']}
                  </p>
                  
                  <a
                    href={item['Ссылка']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Այցելել կայք
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedData.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item['Название']}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {item['Категория']}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {item['Описание']}
                      </p>
                    </div>
                    
                    <a
                      href={item['Ссылка']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Այցելել կայք
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
              let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
              
              // Adjust start page if we're near the end
              if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }
              
              // Add first page and ellipsis if needed
              if (startPage > 1) {
                pages.push(
                  <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    1
                  </button>
                );
                if (startPage > 2) {
                  pages.push(
                    <span key="ellipsis-start" className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
              }
              
              // Add visible page numbers
              for (let page = startPage; page <= endPage; page++) {
                pages.push(
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              
              // Add ellipsis and last page if needed
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push(
                    <span key="ellipsis-end" className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {totalPages}
                  </button>
                );
              }
              
              return pages;
            })()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Նեյրոցանցերի Հարթակ</h3>
              <p className="text-gray-400">
                Ամբողջական հավաքածու AI գործիքների՝ ձեր նախագծերի համար։
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Կապ</h3>
              <p className="text-gray-400">
                Հարցեր կամ առաջարկություններ ունե՞ք։ Կապվեք մեզ հետ։
              </p>
            </div>
            
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Տեղեկություններ</h3>
              <p className="text-gray-400">
                Կանոնավոր թարմացումներ և նոր գործիքներ։
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Նեյրոցանցերի Հարթակ։ Բոլոր իրավունքները պաշտպանված են։</p>
          </div>
        </div>
      </footer>

      {/* Load Monetag Script */}
      <MonetagScript />
      
      {/* Ad Delay Manager */}
      <AdDelayManager />
    </div>
  );
};

export default App;

