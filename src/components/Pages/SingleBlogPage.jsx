// src/components/Pages/SingleBlogPage.jsx
import React from 'react';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';

const SingleBlogPage = ({ blog, onBack, allBlogs, onBlogSelect }) => {
  if (!blog) return null;

  const recentBlogs = allBlogs.filter(b => b.id !== blog.id).slice(0, 5);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = encodeURIComponent(blog.title);
    const text = encodeURIComponent(blog.excerpt);

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank', 'width=600,height=400');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        });
        break;
      default:
        break;
    }
  };

  const fullContent = `
    ${blog.content}

    Modern farming techniques have revolutionized the way we approach livestock and aquaculture management. With advanced feed formulations and precision nutrition, farmers can now achieve optimal growth rates while maintaining the health and welfare of their animals.

    Key benefits include:
    • Improved feed conversion ratios
    • Enhanced disease resistance
    • Better growth performance
    • Reduced environmental impact
    • Increased profitability

    The integration of technology in farming has made it possible to monitor and adjust feeding programs in real-time, ensuring that animals receive the right nutrition at the right time. This approach not only benefits the animals but also contributes to more sustainable farming practices.

    Future developments in this field continue to focus on innovation and sustainability, making farming more efficient and environmentally responsible. As we move forward, these techniques will play a crucial role in meeting the growing global demand for high-quality protein sources.

    Regular monitoring and adjustment of feeding programs ensure optimal results. Farmers who adopt these modern techniques often see significant improvements in their operations within the first few months of implementation.

    In conclusion, embracing modern farming techniques is essential for success in today's competitive agricultural landscape. The investment in quality feed and proper management practices pays dividends in improved productivity and profitability.
  `;

  return (
    <div className="single-blog-container">
      <style jsx>{`
        .single-blog-container {
          min-height: 100vh;
          background: #f9fafb;
        }

        .single-blog-header {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          padding: 40px 0;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 20px;
          transition: transform 0.2s ease;
        }

        .back-button:hover {
          transform: translateX(-4px);
        }

        .blog-header-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .blog-header-meta {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 1rem;
          opacity: 0.9;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .single-blog-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px;
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 60px;
        }

        .blog-content-area {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .blog-featured-image {
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 30px;
          position: relative;
        }

        .blog-featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #374151;
        }

        .blog-content p {
          margin-bottom: 20px;
        }

        .blog-content ul {
          margin: 20px 0;
          padding-left: 20px;
        }

        .blog-content li {
          margin-bottom: 8px;
        }

        .share-section {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid #e5e7eb;
        }

        .share-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .share-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .share-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .share-btn.facebook {
          background: #1877f2;
          color: white;
        }

        .share-btn.twitter {
          background: #1da1f2;
          color: white;
        }

        .share-btn.linkedin {
          background: #0077b5;
          color: white;
        }

        .share-btn.copy {
          background: #6b7280;
          color: white;
        }

        .share-btn:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .recent-blogs-widget {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 20px;
        }

        .widget-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 3px solid #12b431;
        }

        .recent-blog-item {
          display: flex;
          gap: 15px;
          padding: 15px 0;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .recent-blog-item:hover {
          background-color: #f9fafb;
          margin: 0 -15px;
          padding: 15px 15px;
          border-radius: 8px;
        }

        .recent-blog-item:last-child {
          border-bottom: none;
        }

        .recent-blog-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
        }

        .recent-blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .recent-blog-content {
          flex: 1;
        }

        .recent-blog-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.4;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .recent-blog-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8rem;
          color: #6b7280;
        }

        .recent-blog-category {
          background: #12b431;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        @media (max-width: 1200px) {
          .single-blog-main {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .sidebar {
            order: -1;
          }

          .recent-blogs-widget {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .blog-header-title {
            font-size: 2rem;
          }

          .single-blog-main {
            padding: 30px 15px;
          }

          .blog-content-area {
            padding: 25px;
          }

          .blog-featured-image {
            height: 250px;
          }

          .blog-header-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .share-buttons {
            justify-content: center;
          }

          .recent-blog-item {
            flex-direction: column;
            gap: 12px;
          }

          .recent-blog-image {
            width: 100%;
            height: 150px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="single-blog-header">
        <div className="header-content">
          <a href="#" className="back-button" onClick={(e) => { e.preventDefault(); onBack(); }}>
            <ArrowLeft size={20} />
            Back to Blogs
          </a>
          <h1 className="blog-header-title">{blog.title}</h1>
          <div className="blog-header-meta">
            <div className="meta-item">
              <Calendar size={18} />
              <span>{blog.date}</span>
            </div>
            <div className="meta-item">
              <User size={18} />
              <span>{blog.author}</span>
            </div>
            <div className="meta-item">
              <Tag size={18} />
              <span>{blog.readTime}</span>
            </div>
            <div className="category-badge">{blog.category}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="single-blog-main">
        {/* Blog Content */}
        <div className="blog-content-area">
          <div className="blog-featured-image">
            <img src={blog.image} alt={blog.title} />
          </div>

          <div className="blog-content">
            {fullContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('•')) {
                const items = paragraph.split('\n').filter(item => item.trim());
                return (
                  <ul key={index}>
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.replace('•', '').trim()}</li>
                    ))}
                  </ul>
                );
              }
              return paragraph.trim() && <p key={index}>{paragraph.trim()}</p>;
            })}
          </div>

          {/* Share Section */}
          <div className="share-section">
            <h3 className="share-title">
              <Share2 size={20} />
              Share This Article
            </h3>
            <div className="share-buttons">
              <button className="share-btn facebook" onClick={() => handleShare('facebook')}>
                <Facebook size={16} />
                Facebook
              </button>
              <button className="share-btn twitter" onClick={() => handleShare('twitter')}>
                <Twitter size={16} />
                Twitter
              </button>
              <button className="share-btn linkedin" onClick={() => handleShare('linkedin')}>
                <Linkedin size={16} />
                LinkedIn
              </button>
              <button className="share-btn copy" onClick={() => handleShare('copy')}>
                <Copy size={16} />
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="recent-blogs-widget">
            <h3 className="widget-title">Recent Articles</h3>
            {recentBlogs.map(recentBlog => (
              <div key={recentBlog.id} className="recent-blog-item" onClick={() => onBlogSelect && onBlogSelect(recentBlog)}>
                <div className="recent-blog-image">
                  <img src={recentBlog.image} alt={recentBlog.title} />
                </div>
                <div className="recent-blog-content">
                  <h4 className="recent-blog-title">{recentBlog.title}</h4>
                  <div className="recent-blog-meta">
                    <span>{recentBlog.date}</span>
                    <div className="recent-blog-category">{recentBlog.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;