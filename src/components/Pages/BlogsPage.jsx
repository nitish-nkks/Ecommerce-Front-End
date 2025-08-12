// src/components/Pages/BlogsPage.jsx
import React, { useState, useMemo } from 'react';
import { Calendar, User, Tag, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import SingleBlogPage from './SingleBlogPage';

const BlogsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'single'
  const postsPerPage = 6;

  const allBlogPosts = [
    {
      id: 1,
      title: "Modern Poultry Farming Techniques for Maximum Productivity",
      excerpt: "Discover cutting-edge methods that are revolutionizing poultry farming and helping farmers achieve unprecedented growth rates with advanced feed management.",
      content: "Modern poultry farming has evolved significantly with technological advancements and scientific research. Farmers today have access to automated feeding systems, climate-controlled environments, and precision nutrition programs...",
      author: "Dr. Sarah Johnson",
      date: "January 15, 2025",
      category: "Poultry",
      readTime: "5 min read",
      image: "/src/assets/b1 (1).jpg",
      featured: true
    },
    {
      id: 2,
      title: "Fish Nutrition Guidelines: Optimizing Feed for Better Growth",
      excerpt: "Complete comprehensive guide to fish nutrition covering protein requirements, feeding schedules, and growth optimization strategies for aquaculture.",
      content: "Fish nutrition is a complex science that requires understanding of species-specific requirements, water quality parameters, and feeding behaviors...",
      author: "Prof. Michael Chen",
      date: "January 12, 2025",
      category: "Fish",
      readTime: "7 min read",
      image: "/src/assets/p1.png"
    },
    {
      id: 3,
      title: "Shrimp Farming: Disease Prevention and Feed Management",
      excerpt: "Essential strategies for maintaining healthy shrimp populations through proper nutrition, water quality management, and disease prevention protocols.",
      content: "Shrimp farming requires careful attention to water quality, feed composition, and disease management to ensure optimal growth and survival rates...",
      author: "Dr. Emma Rodriguez",
      date: "January 10, 2025",
      category: "Shrimp",
      readTime: "6 min read",
      image: "/src/assets/p2.png",
      featured: true
    },
    {
      id: 4,
      title: "Premium Poultry Feed: Quality Standards and Benefits",
      excerpt: "Understanding the importance of high-quality poultry feed and its impact on bird health, egg production, and meat quality in commercial farming.",
      content: "Quality poultry feed is the foundation of successful poultry farming, directly affecting bird health, productivity, and profitability...",
      author: "Dr. Robert Kumar",
      date: "January 8, 2025",
      category: "Poultry",
      readTime: "8 min read",
      image: "/src/assets/b1 (2).png"
    },
    {
      id: 5,
      title: "Sustainable Fish Feed Solutions for Modern Aquaculture",
      excerpt: "Explore eco-friendly fish feed options that promote sustainable aquaculture practices while maintaining optimal fish growth and health.",
      content: "Sustainable aquaculture is becoming increasingly important as the demand for fish protein continues to grow globally...",
      author: "Prof. Lisa Wong",
      date: "January 5, 2025",
      category: "Fish",
      readTime: "6 min read",
      image: "/src/assets/p3.png"
    },
    {
      id: 6,
      title: "Advanced Shrimp Breeding Techniques and Nutrition",
      excerpt: "Learn about cutting-edge shrimp breeding methods and specialized nutrition programs that maximize yield and quality in commercial operations.",
      content: "Modern shrimp farming has revolutionized with selective breeding programs and precise nutritional management...",
      author: "Dr. James Park",
      date: "January 3, 2025",
      category: "Shrimp",
      readTime: "9 min read",
      image: "/src/assets/b1 (3).png"
    },
    {
      id: 7,
      title: "Organic Poultry Feed: Benefits and Implementation",
      excerpt: "Comprehensive guide to organic poultry feed options, certification requirements, and the benefits for both farmers and consumers.",
      content: "Organic poultry farming is growing in popularity as consumers demand healthier, more sustainable food options...",
      author: "Dr. Maria Silva",
      date: "December 30, 2024",
      category: "Poultry",
      readTime: "7 min read",
      image: "/src/assets/b1 (4).png"
    },
    {
      id: 8,
      title: "Water Quality Management in Fish Farming",
      excerpt: "Essential techniques for maintaining optimal water conditions in fish farming operations to ensure healthy growth and maximum productivity.",
      content: "Water quality is perhaps the most critical factor in successful fish farming operations...",
      author: "Dr. Ahmed Hassan",
      date: "December 28, 2024",
      category: "Fish",
      readTime: "5 min read",
      image: "/src/assets/b1 (1).png"
    }
  ];

  const recentPosts = allBlogPosts.slice(0, 4);

  // Filter posts based on selected categories and search term
  const filteredPosts = useMemo(() => {
    let filtered = allBlogPosts;
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => selectedCategories.includes(post.category));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategories, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setViewMode('single');
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
    setViewMode('list');
  };

  // If viewing single blog, render SingleBlogPage
  if (viewMode === 'single' && selectedBlog) {
    return (
      <SingleBlogPage 
        blog={selectedBlog} 
        onBack={handleBackToList}
        allBlogs={allBlogPosts}
        onBlogSelect={handleBlogClick}
      />
    );
  }

  return (
    <div className="blogs-container">
      <style jsx>{`
        .blogs-container {
          min-height: 100vh;
          background: #f9fafb;
        }

        .blogs-header {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          padding: 30px 0;
          text-align: center;
        }

        .blogs-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .blogs-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .blogs-subtitle {
          font-size: 1.2rem;
          opacity: 0.95;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .blogs-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
        }

        .sidebar {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .search-box {
          position: relative;
          margin-bottom: 30px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 45px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #12b431;
          box-shadow: 0 0 0 3px rgba(18, 180, 49, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .filter-section {
          margin-bottom: 30px;
        }

        .filter-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .filter-option:hover {
          background-color: #f3f4f6;
        }

        .filter-checkbox {
          width: 18px;
          height: 18px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          position: relative;
          transition: all 0.2s ease;
        }

        .filter-checkbox.checked {
          background-color: #12b431;
          border-color: #12b431;
        }

        .filter-checkbox.checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .filter-label {
          font-size: 14px;
          color: #374151;
          font-weight: 500;
        }

        .recent-posts {
          border-top: 1px solid #e5e7eb;
          padding-top: 25px;
        }

        .recent-post-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .recent-post-item:hover {
          background-color: #f9fafb;
          margin: 0 -15px;
          padding: 12px 15px;
          border-radius: 8px;
        }

        .recent-post-item:last-child {
          border-bottom: none;
        }

        .recent-post-image {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
        }

        .recent-post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .recent-post-content {
          flex: 1;
        }

        .recent-post-title {
          font-size: 13px;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.4;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .recent-post-date {
          font-size: 11px;
          color: #6b7280;
        }

        .content-area {
          display: flex;
          flex-direction: column;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .blog-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          position: relative;
        }

        .blog-card.featured::after {
          content: '⭐ Featured';
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f59e0b;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          z-index: 2;
        }

        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .blog-image {
          height: 220px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
        }

        .blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .blog-card:hover .blog-image img {
          transform: scale(1.05);
        }

        .blog-category-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #12b431;
          color: white;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 1;
        }

        .blog-content {
          padding: 28px;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 14px;
          font-size: 0.875rem;
          color: #6b7280;
          flex-wrap: wrap;
        }

        .blog-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .blog-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 14px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-excerpt {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-read-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #12b431;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .blog-read-more:hover {
          color: #0ea025;
          transform: translateX(4px);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-top: 40px;
        }

        .pagination-btn {
          padding: 10px 16px;
          border: 2px solid #e5e7eb;
          background: white;
          color: #6b7280;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pagination-btn:hover:not(.disabled) {
          border-color: #12b431;
          color: #12b431;
          transform: translateY(-2px);
        }

        .pagination-btn.active {
          background: #12b431;
          border-color: #12b431;
          color: white;
        }

        .pagination-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-info {
          color: #6b7280;
          font-size: 0.9rem;
          margin-left: 20px;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        @media (max-width: 1200px) {
          .blogs-main {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .sidebar {
            position: static;
            order: -1;
            padding: 20px;
          }

          .filter-options {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px;
          }

          .filter-option {
            background: #f9fafb;
            padding: 10px 16px;
            border-radius: 20px;
            border: 1px solid #e5e7eb;
          }
        }

        @media (max-width: 768px) {
          .blogs-title {
            font-size: 2.5rem;
          }
          
          .blogs-grid {
            grid-template-columns: 1fr;
          }
          
          .blog-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .blogs-main {
            padding: 30px 15px;
          }

          .sidebar {
            padding: 15px;
          }

          .pagination {
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="blogs-header">
        <div className="blogs-content">
          <h1 className="blogs-title">Blogs</h1>
          <p className="blogs-subtitle">
            Expert insights, farming techniques, and industry trends to help you succeed in livestock farming
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="blogs-main">
        {/* Sidebar */}
        <div className="sidebar">
          {/* Search Box */}
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <h3 className="filter-title">
              <Tag size={18} />
              Categories
            </h3>
            <div className="filter-options">
              {['Fish', 'Shrimp', 'Poultry'].map(category => (
                <div
                  key={category}
                  className="filter-option"
                  onClick={() => handleCategoryChange(category)}
                >
                  <div className={`filter-checkbox ${selectedCategories.includes(category) ? 'checked' : ''}`} />
                  <span className="filter-label">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="recent-posts">
            <h3 className="filter-title">Recent Posts</h3>
            {recentPosts.map(post => (
              <div key={post.id} className="recent-post-item" onClick={() => handleBlogClick(post)}>
                <div className="recent-post-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="recent-post-content">
                  <div className="recent-post-title">{post.title}</div>
                  <div className="recent-post-date">{post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {currentPosts.length > 0 ? (
            <>
              <div className="blogs-grid">
                {currentPosts.map((post) => (
                  <article key={post.id} className={`blog-card ${post.featured ? 'featured' : ''}`}>
                    <div className="blog-image" onClick={() => handleBlogClick(post)} style={{cursor: 'pointer'}}>
                      <img src={post.image} alt={post.title} />
                      <span className="blog-category-badge">{post.category}</span>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <div className="blog-meta-item">
                          <Calendar size={16} />
                          <span>{post.date}</span>
                        </div>
                        <div className="blog-meta-item">
                          <User size={16} />
                          <span>{post.author}</span>
                        </div>
                        <div className="blog-meta-item">
                          <Tag size={16} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h2 className="blog-title" onClick={() => handleBlogClick(post)} style={{cursor: 'pointer'}}>{post.title}</h2>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <a href="#" className="blog-read-more" onClick={(e) => { e.preventDefault(); handleBlogClick(post); }}>
                        Read More <ArrowRight size={16} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight size={18} />
                  </button>
                  
                  <span className="pagination-info">
                    Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or category filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;