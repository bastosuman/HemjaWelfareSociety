import React, { useState, useEffect } from 'react';
import './Home.css';

interface ImageData {
  src: string;
  alt: string;
  caption: string;
  category: string;
}

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);

  const images: ImageData[] = [
    {
      src: "/assets/images/hemja1.jpg",
      alt: "Hemja Community Gathering",
      caption: "Community members enjoying the picnic",
      category: "gathering"
    },
    {
      src: "/assets/images/Hemja2.jpg",
      alt: "Hemja Community Event",
      caption: "Group photo at the picnic",
      category: "group"
    },
    {
      src: "/assets/images/hemja3.jpg",
      alt: "Hemja Community Celebration",
      caption: "Traditional dance performance",
      category: "performance"
    },
    {
      src: "/assets/images/490983525_1787680558628917_2042399229713310511_n.jpg",
      alt: "Community Activity",
      caption: "Fun activities and games",
      category: "activities"
    },
    {
      src: "/assets/images/490567339_653454917317482_1051594292879302821_n.jpg",
      alt: "Community Gathering",
      caption: "Food and cultural exchange",
      category: "food"
    },
    {
      src: "/assets/images/489980282_1385217469150391_7321237762334734584_n.jpg",
      alt: "Community Event",
      caption: "Group discussions and networking",
      category: "discussion"
    }
  ];

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === activeFilter));
    }
  }, [activeFilter]);

  const openLightbox = (image: ImageData) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  const shareImage = async () => {
    if (!selectedImage) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Hemja Welfare Society',
          text: selectedImage.caption,
          url: window.location.href
        });
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const downloadImage = () => {
    if (!selectedImage) return;
    
    const link = document.createElement('a');
    link.href = selectedImage.src;
    link.download = `hemja-${selectedImage.category}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="main-content">
      <section className="community-gallery">
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

        <div className="image-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={index} 
              className="image-item"
              onClick={() => openLightbox(image)}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={closeLightbox}>×</button>
            <div className="lightbox-navigation">
              <button className="nav-button prev" onClick={() => navigateImage('prev')}>❮</button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="lightbox-image"
              />
              <button className="nav-button next" onClick={() => navigateImage('next')}>❯</button>
            </div>
            <div className="lightbox-actions">
              <button className="action-button" onClick={shareImage}>
                <span className="action-icon">📤</span> Share
              </button>
              <button className="action-button" onClick={downloadImage}>
                <span className="action-icon">⬇️</span> Download
              </button>
            </div>
            <p className="lightbox-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}

      <section className="welcome-section">
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
      </section>
    </main>
  );
};

export default Home; 