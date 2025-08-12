// src/components/Pages/AboutPage.jsx
import React from 'react';
import { Award, Users, Target, Heart, Truck, Shield, Star, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: <Users size={28} />, number: "50K+", label: "Happy Farmers" },
    { icon: <Truck size={28} />, number: "200+", label: "Feed Products" },
    { icon: <Award size={28} />, number: "15+", label: "Years Experience" },
    { icon: <Star size={28} />, number: "98%", label: "Success Rate" }
  ];

  const values = [
    {
      icon: <Target size={32} />,
      title: "Our Mission",
      description: "To provide premium quality livestock nutrition solutions that empower farmers to achieve better yields and healthier animals."
    },
    {
      icon: <Heart size={32} />,
      title: "Our Vision",
      description: "To be the leading feed manufacturer in India, supporting sustainable agriculture and improving farmer livelihoods."
    },
    {
      icon: <Shield size={32} />,
      title: "Our Values",
      description: "Quality, integrity, innovation, and customer satisfaction drive everything we do at Feedora."
    }
  ];

  const team = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Chief Executive Officer",
      image: "👨‍💼",
      description: "20+ years experience in agricultural sciences"
    },
    {
      name: "Dr. Priya Sharma",
      position: "Head of Research & Development",
      image: "👩‍🔬",
      description: "Expert in animal nutrition and feed formulation"
    },
    {
      name: "Mr. Anil Singh",
      position: "Head of Operations",
      image: "👨‍💻",
      description: "15+ years in supply chain and operations"
    },
    {
      name: "Ms. Kavya Reddy",
      position: "Customer Success Manager",
      image: "👩‍💼",
      description: "Dedicated to farmer satisfaction and support"
    }
  ];

  return (
    <div className="about-container">
      <style jsx>{`
        .about-container {
          min-height: 100vh;
          background: #fafbfc;
          font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
        }

        .about-header {
          background: linear-gradient(135deg, rgba(18, 180, 49, 0.5) 0%, rgba(14, 160, 37, 0.9) 100%), url('/src/assets/banner-about.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          color: white;
          padding: 120px 0 100px;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 2;
        }

        .about-title {
          font-size: 4.5rem;
          font-weight: 900;
          margin-bottom: 24px;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 1s ease-out;
        }

        .about-subtitle {
          font-size: 1.4rem;
          font-weight: 400;
          max-width: 700px;
          line-height: 1.6;
          opacity: 0.95;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .about-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 40px;
          background: white;
          border-radius: 20px 20px 0 0;
          margin-top: -50px;
          position: relative;
          z-index: 3;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.1);
        }

        .section {
          margin-bottom: 120px;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: #111827;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(135deg, #12b431, #0ea025);
          border-radius: 2px;
        }

        .section-description {
          font-size: 1.2rem;
          color: #64748b;
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          margin-bottom: 120px;
        }

        .stat-card {
          text-align: center;
          padding: 32px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #f1f5f9;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #12b431, #22d3ee);
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #12b431, #22d3ee);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: white;
          box-shadow: 0 4px 16px rgba(18, 180, 49, 0.2);
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: #12b431;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-weight: 600;
          color: #64748b;
          font-size: 0.95rem;
        }

        .story-section {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 24px;
          padding: 64px 48px;
          margin-bottom: 120px;
          position: relative;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        
        .story-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(135deg, #12b431, #22d3ee, #a855f7);
        }

        .story-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .story-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 28px;
          font-weight: 400;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .value-card {
          background: white;
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          border: 1px solid #f1f5f9;
          position: relative;
          overflow: hidden;
        }
        
        .value-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #12b431, #22d3ee);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }
        
        .value-card:hover::before {
          transform: translateX(0);
        }

        .value-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #059669;
          box-shadow: 0 4px 16px rgba(5, 150, 105, 0.15);
        }

        .value-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .value-description {
          color: #64748b;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .team-card {
          background: white;
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          border: 1px solid #f1f5f9;
          position: relative;
          overflow: hidden;
        }
        
        .team-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #12b431, #a855f7);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }
        
        .team-card:hover::before {
          transform: translateX(0);
        }

        .team-avatar {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .team-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .team-position {
          font-size: 0.85rem;
          color: #12b431;
          font-weight: 600;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .team-description {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
        }

        .cta-section {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 50%, #22d3ee 100%);
          border-radius: 24px;
          padding: 64px 48px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          position: relative;
          z-index: 2;
        }

        .cta-description {
          font-size: 1.2rem;
          opacity: 0.95;
          margin-bottom: 40px;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          position: relative;
          z-index: 2;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        .btn {
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-white {
          background: white;
          color: #12b431;
          border: none;
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
        }

        .btn-white:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 32px rgba(255, 255, 255, 0.4);
        }

        .btn-outline {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: white;
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 32px rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .about-title {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .story-section,
          .cta-section {
            padding: 32px 24px;
          }
          
          .values-grid,
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .about-title {
            font-size: 2rem;
          }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg);
          }
        }

        /* Scroll-triggered animations */
        .stat-card,
        .value-card,
        .team-card {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }

        .value-card:nth-child(1) { animation-delay: 0.1s; }
        .value-card:nth-child(2) { animation-delay: 0.2s; }
        .value-card:nth-child(3) { animation-delay: 0.3s; }

        .team-card:nth-child(1) { animation-delay: 0.1s; }
        .team-card:nth-child(2) { animation-delay: 0.2s; }
        .team-card:nth-child(3) { animation-delay: 0.3s; }
        .team-card:nth-child(4) { animation-delay: 0.4s; }
      `}</style>

      {/* Header */}
      <div className="about-header">
        <div className="about-content">
          <h1 className="about-title">About Feedora</h1>
          <p className="about-subtitle">
            Pioneering premium livestock nutrition solutions for over 15 years, 
            empowering farmers across India to achieve excellence in animal farming.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-main">
        {/* Stats Section */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="story-section">
          <div className="story-content">
            <h2 className="section-title">Our Story</h2>
            <p className="story-text">
              Founded in 2009, Feedora began as a small family-owned business with a simple mission: 
              to provide farmers with the highest quality feed for their livestock. What started as a 
              local feed supplier has grown into one of India's most trusted names in animal nutrition.
            </p>
            <p className="story-text">
              Our journey has been driven by our commitment to innovation, quality, and the success 
              of the farming community. Today, we serve over 50,000 farmers across India, providing 
              specialized nutrition solutions for poultry, fish, shrimp, cattle, and other livestock.
            </p>
            <p className="story-text">
              Every product we create is backed by extensive research, rigorous testing, and a deep 
              understanding of animal nutrition science. We believe that healthy animals lead to 
              prosperous farms and stronger communities.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="section">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-description">
            These principles guide every decision we make and every product we create
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="section">
          <h2 className="section-title">Meet Our Leadership Team</h2>
          <p className="section-description">
            Experienced professionals dedicated to advancing livestock nutrition science
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.image}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Transform Your Farm?</h2>
          <p className="cta-description">
            Join thousands of successful farmers who trust Feedora for their livestock nutrition needs. 
            Get expert guidance and premium quality feeds delivered to your doorstep.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-white">
              <Users size={18} />
              Become a Customer
            </button>
            <button className="btn btn-outline">
              <ArrowRight size={18} />
              View Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;