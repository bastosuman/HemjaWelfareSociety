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
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  const images: ImageData[] = [
    {
      src: "/assets/images/hemja1.jpg",
      alt: "Hemja Community Gathering",
      caption: "Community members enjoying the picnic",
      category: "gathering"
    },
    {
      src: "/assets/images/490983525_1787680558628917_2042399229713310511_n.jpg",
      alt: "Community Activity",
      caption: "Fun activities and games",
      category: "activities"
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

      <section className="meeting-section">
        <div className="meeting-header" onClick={() => setIsMeetingOpen(!isMeetingOpen)}>
          <h2>तेस्रो बैठकबाट निम्न बिषय हरुमा छलफल गरी निर्णय गरियो</h2>
          <span className={`meeting-toggle ${isMeetingOpen ? 'open' : ''}`}>▼</span>
        </div>
        
        {isMeetingOpen && (
          <div className="meeting-content">
            <div className="greeting">
              <p>यहाँहरु संम्पुर्णमा नमस्कार</p>
              <p>नयाँ बर्ष २०८२ सालको हार्दिक मंगलमय शुभकामना व्यक्त गर्दछौं॥</p>
            </div>

            <div className="meeting-info">
              <p>हाम्रो संस्था हेमजा वेलफेयर सोसाईटी स्थापना कालदेखि नैं बिभिन्न चरणहरु पार गर्दैं यहाँसम्म आएको कुरा यहाँहरुलाई थाहानैं छ तथापि हामिले गर्नुपर्ने र गर्नसक्ने कतिपय कुराहरु समयमा गर्न सकेनौं र भैंपरि आएका कतिपय परिघटनाहरुलाई हामिसबैंको सहयोगबाट समाधानपनि गर्यौं।अब हाम्रो काम भनेको संस्थालाई चलायमान बनाउने र प्रतेक हेमजाबासीहरुलाई संस्थामा आवद्द गराएर अरु उद्देश्यहरु पुरा गर्दैं संस्थालाई आर्थिक र सामाजिक रुपमा अझ संक्षम र सबल बनाई हाम्रो हेमजासम्म जोड्ने हो।त्यसको लागि यहाँहरुको साथ,समर्थन र सहयोगको अझ बढि आवस्यकता रहन्छ त्यसकारण यहाँहरुबाट धेरैं अपेक्षा राखेकाछौं र आउदा दिनहरुमा हामि क्रमश संस्थालाई सबल बनाउने तर्फ अगाडी बढ्ने छौं।</p>
              
              <p className="meeting-date">April 6, 2025 मा Hicksville मा सम्पन्न</p>

              <div className="committee-section">
                <h3>संस्थापक संरक्षक:</h3>
                <p>विश्ब राज बाँस्तोला</p>

                <h3>संरक्षक:</h3>
                <ul>
                  <li>गंगाधर त्रिपाठी</li>
                  <li>टेक ब. कुँवर</li>
                  <li>मोहन क्षेत्रि</li>
                  <li>ध्रुव कुँवर</li>
                </ul>

                <h3>कार्य समिति</h3>
                <ul>
                  <li>अध्यक्ष: ध्रुव राज पौंडेल</li>
                  <li>उपाध्यक्ष: पदम दाहाल</li>
                  <li>म.उपाध्यक्ष: लक्ष्मि थापा</li>
                  <li>महासचिव: विश्व राज तिमिल्सिना</li>
                  <li>सचिव: बिर ब.कुँवर</li>
                  <li>कोषाध्यक्ष: लाल बहादुर जि.सि</li>
                  <li>सदस्य: पदम कुँवर</li>
                  <li>सदस्य: सुमन बाँस्तोला</li>
                  <li>सदस्य: बिदुर सापकोटा</li>
                  <li>सदस्य: सिता तिमिल्सिना</li>
                  <li>सदस्य: गम ब. नेपाली</li>
                </ul>

                <h3>सल्लाहकारहरु</h3>
                <div className="advisors-grid">
                  <div className="advisor-group">
                    <h4>न्युयोर्क:</h4>
                    <ul>
                      <li>निरज के.सि.</li>
                      <li>अशोक राना</li>
                      <li>निरज सापकोटा</li>
                      <li>नविन कुमार अधिकारी</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>शिकागो:</h4>
                    <ul>
                      <li>गंगा थापा</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>न्युजर्सि:</h4>
                    <ul>
                      <li>हरि खड्का</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>भर्जिनिया:</h4>
                    <ul>
                      <li>जनक कुँवर</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>क्यालिफोर्निया:</h4>
                    <ul>
                      <li>अनिल कुँवर</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>टेक्सस:</h4>
                    <ul>
                      <li>गोविन्द कुँवर</li>
                      <li>राजु तिमिल्सिना</li>
                      <li>गोविन्द अधिकारी</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>पेन्सलभेनिया:</h4>
                    <ul>
                      <li>-</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>जर्जिया:</h4>
                    <ul>
                      <li>हरि तिमिल्सिना</li>
                      <li>धन ब.कुँवर</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>मेरिल्यान्ड:</h4>
                    <ul>
                      <li>नविन राज पौंडेल</li>
                    </ul>
                  </div>
                  <div className="advisor-group">
                    <h4>कोलोराडो:</h4>
                    <ul>
                      <li>शिवहरि अधिकारी</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
    </main>
  );
};

export default Home; 