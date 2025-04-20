import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import './Home.css';

interface ImageData {
  src: string;
  alt: string;
  caption: string;
  category: string;
  likes?: number;
  shares?: number;
}

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageStats, setImageStats] = useState<Record<string, { likes: number; shares: number }>>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const images: ImageData[] = [
    {
      src: "/assets/images/hemja1.jpg",
      alt: "Hemja Community Gathering",
      caption: "Community members enjoying the picnic",
      category: "gathering",
      likes: 0,
      shares: 0
    },
    {
      src: "/assets/images/490983525_1787680558628917_2042399229713310511_n.jpg",
      alt: "Community Activity",
      caption: "Fun activities and games",
      category: "activities",
      likes: 0,
      shares: 0
    },
    {
      src: "/assets/images/489980282_1385217469150391_7321237762334734584_n.jpg",
      alt: "Community Event",
      caption: "Group discussions and networking",
      category: "discussion",
      likes: 0,
      shares: 0
    }
  ];

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === activeFilter));
    }
  }, [activeFilter]);

  const openLightbox = (image: ImageData) => {
    const index = images.findIndex(img => img.src === image.src);
    setCurrentImageIndex(index);
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % images.length;
    } else {
      newIndex = (currentImageIndex - 1 + images.length) % images.length;
    }
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    }
  };

  const handleLike = (imageSrc: string) => {
    setImageStats(prev => ({
      ...prev,
      [imageSrc]: {
        ...prev[imageSrc],
        likes: (prev[imageSrc]?.likes || 0) + 1
      }
    }));
  };

  const handleShare = (imageSrc: string) => {
    setImageStats(prev => ({
      ...prev,
      [imageSrc]: {
        ...prev[imageSrc],
        shares: (prev[imageSrc]?.shares || 0) + 1
      }
    }));
    // In a real app, you would implement actual sharing functionality here
    alert('Sharing functionality would be implemented here');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  return (
    <>
      <Header />
      <main className="main-content">
        {showWelcomePopup && (
          <>
            <div className="welcome-popup-overlay" onClick={() => setShowWelcomePopup(false)} />
            <div className="welcome-popup">
              <button className="close-popup" onClick={() => setShowWelcomePopup(false)}>×</button>
              <div className="welcome-content">
                <h1 className="welcome-title">Welcome to the Hemja Welfare Society Website</h1>
                
                <p className="welcome-text">
                  We are currently working on building and updating our website. Upcoming events and important announcements will be posted here shortly.
                </p>
                
                <p className="welcome-text">
                  In the meantime, we are collecting information about individuals from Hemja who are currently living in the USA.
                </p>
                
                <p className="welcome-text">
                  Please use the link below to submit your details:
                </p>
                
                <a 
                  href="https://forms.gle/LSrkJMLpqcEMVtwK6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="form-link"
                >
                  <span className="emoji-pointer">👉</span>
                  Submit Your Details
                </a>
                
                <p className="thank-you">
                  Thank you for your support!
                </p>
              </div>
            </div>
          </>
        )}

        <section className="gallery-section">
          <h2 className="gallery-title">Our Community in Hemja Picnic 2024</h2>
          
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="loading-grid">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="loading-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="image-grid">
              {filteredImages.map((image, index) => (
                <div 
                  key={index} 
                  className="image-item"
                  onClick={() => openLightbox(image)}
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <div className="image-container">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      loading="lazy"
                      onLoad={(e) => e.currentTarget.classList.add('loaded')}
                    />
                    <div className="image-overlay">
                      <p className="image-caption">{image.caption}</p>
                      <span className="zoom-icon">🔍</span>
                      <span className="image-category">{image.category}</span>
                      <div className="image-stats">
                        <span className="stat-item">
                          ❤️ {imageStats[image.src]?.likes || 0}
                        </span>
                        <span className="stat-item">
                          📤 {imageStats[image.src]?.shares || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button className="close-button" onClick={closeLightbox}>×</button>
              <div className="lightbox-navigation">
                <button 
                  className="nav-button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  data-key="←"
                >
                  ◀
                </button>
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="lightbox-image"
                />
                <button 
                  className="nav-button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  data-key="→"
                >
                  ▶
                </button>
              </div>
              <p className="lightbox-caption">{selectedImage.caption}</p>
              <div className="lightbox-actions">
                <button 
                  className="action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(selectedImage.src);
                  }}
                >
                  <span className="action-icon">❤️</span>
                  Like ({imageStats[selectedImage.src]?.likes || 0})
                </button>
                <button 
                  className="action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(selectedImage.src);
                  }}
                >
                  <span className="action-icon">📤</span>
                  Share ({imageStats[selectedImage.src]?.shares || 0})
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home; 