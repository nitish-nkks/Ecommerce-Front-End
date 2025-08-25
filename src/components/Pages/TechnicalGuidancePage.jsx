
// src/components/Pages/TechnicalGuidancePage.jsx
import React from 'react';
import { BookOpen, Users, Video, Download, ArrowRight, CheckCircle } from 'lucide-react';

const TechnicalGuidancePage = () => {
  const guidanceCategories = [
    {
      title: "Feed Conversion Ratio Optimization",
      description: "Learn techniques to improve FCR and maximize profitability",
      topics: [
        "Understanding FCR calculations",
        "Factors affecting feed efficiency",
        "Optimization strategies",
        "Monitoring and tracking"
      ],
      icon: "📊",
      duration: "45 min"
    },
    {
      title: "Water Quality Management",
      description: "Essential practices for maintaining optimal water conditions",
      topics: [
        "Water testing protocols",
        "pH and dissolved oxygen management",
        "Filtration systems",
        "Disease prevention through water quality"
      ],
      icon: "💧",
      duration: "60 min"
    },
    {
      title: "Biosecurity Protocols",
      description: "Comprehensive biosecurity measures for disease prevention",
      topics: [
        "Farm entry/exit procedures",
        "Equipment sanitization",
        "Quarantine protocols",
        "Emergency response plans"
      ],
      icon: "🛡️",
      duration: "90 min"
    },
    {
      title: "Growth Performance Analysis",
      description: "Data-driven approaches to monitor and improve growth rates",
      topics: [
        "Performance metrics",
        "Data collection methods",
        "Analysis techniques",
        "Improvement strategies"
      ],
      icon: "📈",
      duration: "75 min"
    }
  ];

  const resources = [
    {
      title: "Complete Feed Management Guide",
      type: "PDF Download",
      size: "2.5 MB",
      description: "Comprehensive 50-page guide covering all aspects of feed management"
    },
    {
      title: "Video Tutorial Series",
      type: "Video Course",
      size: "12 videos",
      description: "Step-by-step video tutorials for practical implementation"
    },
    {
      title: "Feed Calculator Tool",
      type: "Excel Template",
      size: "150 KB",
      description: "Calculate optimal feed quantities and nutritional requirements"
    }
  ];

  return (
    <div className="guidance-container">
      <style jsx>{`
        .guidance-container {
          minHeight: '100vh',
          background: 'white'
        }

        .guidance-header {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          padding: 60px 0;
          text-align: center;
          margin-top: 150px;
        }

        .guidance-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .guidance-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .guidance-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .guidance-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .section {
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
          text-align: center;
        }

        .section-description {
          font-size: 1.1rem;
          color: #6b7280;
          text-align: center;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .guidance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 32px;
        }

        .guidance-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .guidance-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .guidance-header-content {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .guidance-icon {
          font-size: 3rem;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          padding: 16px;
          border-radius: 12px;
          border: 2px solid #d1fae5;
        }

        .guidance-info h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .guidance-info p {
          color: #6b7280;
          margin-bottom: 8px;
        }

        .guidance-duration {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #dcfce7;
          color: #059669;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .guidance-topics {
          list-style: none;
          padding: 0;
          margin-bottom: 24px;
        }

        .guidance-topics li {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
        }

        .guidance-topics li:last-child {
          border-bottom: none;
        }

        .guidance-action {
          background: linear-gradient(135deg, #12b431, #0ea025);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          justify-content: center;
        }

        .guidance-action:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(18, 180, 49, 0.3);
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .resource-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .resource-card:hover {
          transform: translateY(-2px);
        }

        .resource-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .resource-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #12b431, #f9f225);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .resource-info h4 {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .resource-meta {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .resource-description {
          color: #6b7280;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .resource-download {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          justify-content: center;
        }

        .resource-download:hover {
          background: #e5e7eb;
          color: #12b431;
        }

        @media (max-width: 768px) {
          .guidance-title {
            font-size: 2rem;
          }
          
          .guidance-grid {
            grid-template-columns: 1fr;
          }
          
          .guidance-header-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      {/* Header */}
      <div className="guidance-header">
        <div className="guidance-content">
          <h1 className="guidance-title">Technical Guidance</h1>
          <p className="guidance-subtitle">
            Expert-led training programs and resources to optimize your livestock farming operations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="guidance-main">
        {/* Training Programs */}
        <div className="section">
          <h2 className="section-title">Expert Training Programs</h2>
          <p className="section-description">
            Comprehensive training modules designed by industry experts to help you master advanced farming techniques
          </p>
          <div className="guidance-grid">
            {guidanceCategories.map((category, index) => (
              <div key={index} className="guidance-card">
                <div className="guidance-header-content">
                  <div className="guidance-icon">{category.icon}</div>
                  <div className="guidance-info">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <span className="guidance-duration">⏱️ {category.duration}</span>
                  </div>
                </div>
                <ul className="guidance-topics">
                  {category.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>
                      <CheckCircle size={16} color="#12b431" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <button className="guidance-action">
                  Start Learning <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="section">
          <h2 className="section-title">Downloadable Resources</h2>
          <p className="section-description">
            Access our library of guides, tools, and templates to support your farming operations
          </p>
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-header">
                  <div className="resource-icon">
                    {resource.type === 'PDF Download' ? <Download size={20} /> : 
                     resource.type === 'Video Course' ? <Video size={20} /> : 
                     <BookOpen size={20} />}
                  </div>
                  <div className="resource-info">
                    <h4>{resource.title}</h4>
                    <div className="resource-meta">{resource.type} • {resource.size}</div>
                  </div>
                </div>
                <p className="resource-description">{resource.description}</p>
                <button className="resource-download">
                  <Download size={16} />
                  Download Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalGuidancePage;
