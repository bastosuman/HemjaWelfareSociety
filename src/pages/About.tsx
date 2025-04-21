import React, { useState } from 'react';
import './About.css';

interface Person {
  name: string;
  role?: string;
  image?: string;
}

interface AdvisorGroup {
  location: string;
  members: Person[];
}

const About: React.FC = () => {
  const [founder, setFounder] = useState<Person>({ 
    name: 'विश्ब राज बाँस्तोला',
    image: '/assets/images/Bishwaraj bastola.jpg'
  });
  const [patrons, setPatrons] = useState<Person[]>([
    { name: 'गंगाधर त्रिपाठी', image: '/assets/images/ganga Tripathi.jpg' },
    { name: 'टेक ब. कुँवर' },
    { name: 'मोहन क्षेत्रि' },
    { name: 'ध्रुव कुँवर' }
  ]);
  const [committee, setCommittee] = useState<Person[]>([
    { name: 'ध्रुव राज पौंडेल', role: 'अध्यक्ष', image: '/assets/images/Dhruba Paudel.jpg' },
    { name: 'पदम दाहाल', role: 'उपाध्यक्ष', image: '/assets/images/padam dahal.jpg' },
    { name: 'लक्ष्मि थापा', role: 'म.उपाध्यक्ष', image: '/assets/images/laxmi thapa.jpg' },
    { name: 'विश्व राज तिमिल्सिना', role: 'महासचिव', image: '/assets/images/Bishwaraj Timilsina.jpg' },
    { name: 'बिर ब.कुँवर', role: 'सचिव', image: '/assets/images/Bir Bahdur Kunwar.JPG' },
    { name: 'लाल बहादुर जि.सि', role: 'कोषाध्यक्ष' },
    { name: 'पदम कुँवर', role: 'सदस्य' },
    { name: 'सुमन बाँस्तोला', role: 'सदस्य', image: 'assets/images/Suman.jpg' },
    { name: 'बिदुर सापकोटा', role: 'सदस्य' },
    { name: 'सिता तिमिल्सिना', role: 'सदस्य' },
    { name: 'गम ब. नेपाली', role: 'सदस्य' }
  ]);
  const [advisors, setAdvisors] = useState<AdvisorGroup[]>([
    {
      location: 'न्युयोर्क',
      members: [
        { name: 'निरज के.सि.' },
        { name: 'अशोक राना' },
        { name: 'निरज सापकोटा' },
        { name: 'नविन कुमार अधिकारी' }
      ]
    },
    {
      location: 'शिकागो',
      members: [
        { name: 'गंगा थापा' }
      ]
    },
    {
      location: 'न्युजर्सि',
      members: [
        { name: 'हरि खड्का' }
      ]
    },
    {
      location: 'भर्जिनिया',
      members: [
        { name: 'जनक कुँवर' }
      ]
    },
    {
      location: 'क्यालिफोर्निया',
      members: [
        { name: 'अनिल कुँवर' }
      ]
    },
    {
      location: 'टेक्सस',
      members: [
        { name: 'गोविन्द कुँवर' },
        { name: 'राजु तिमिल्सिना' },
        { name: 'गोविन्द अधिकारी' }
      ]
    },
    {
      location: 'पेन्सलभेनिया',
      members: [
        { name: '-' }
      ]
    },
    {
      location: 'जर्जिया',
      members: [
        { name: 'हरि तिमिल्सिना' },
        { name: 'धन ब.कुँवर' }
      ]
    },
    {
      location: 'मेरिल्यान्ड',
      members: [
        { name: 'नविन राज पौंडेल' }
      ]
    },
    {
      location: 'कोलोराडो',
      members: [
        { name: 'शिवहरि अधिकारी' }
      ]
    }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, person: Person, setPerson: (p: Person) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerson({ ...person, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="about-container">
      <h1 className="about-title">
        <span>About Us</span>
      </h1>
      
      <section className="main-section">
        <h2 className="section-title">Our Team</h2>
        
        <div className="founder-section">
          <h3 className="section-title">संस्थापक संरक्षक:</h3>
          <div className="person-card">
            {founder.image ? (
              <img src={founder.image} alt={founder.name} className="person-image" />
            ) : (
              <div className="image-upload-placeholder">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, founder, setFounder)}
                  className="image-upload-input"
                />
                <span>Upload Image</span>
              </div>
            )}
            <p>{founder.name}</p>
          </div>
        </div>

        <div className="patrons-section">
          <h3 className="section-title">संरक्षक:</h3>
          <div className="patrons-grid">
            {patrons.map((patron, index) => (
              <div key={index} className="person-card">
                {patron.image ? (
                  <img src={patron.image} alt={patron.name} className="person-image" />
                ) : (
                  <div className="image-upload-placeholder">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, patron, (p) => {
                        const newPatrons = [...patrons];
                        newPatrons[index] = p;
                        setPatrons(newPatrons);
                      })}
                      className="image-upload-input"
                    />
                    <span>Upload Image</span>
                  </div>
                )}
                <p>{patron.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="committee-section">
          <h3 className="section-title">कार्य समिति</h3>
          <div className="committee-grid">
            {committee.map((member, index) => (
              <div key={index} className="person-card">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="person-image" />
                ) : (
                  <div className="image-upload-placeholder">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, member, (p) => {
                        const newCommittee = [...committee];
                        newCommittee[index] = p;
                        setCommittee(newCommittee);
                      })}
                      className="image-upload-input"
                    />
                    <span>Upload Image</span>
                  </div>
                )}
                <p>{member.role}: {member.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="advisors-section">
          <h3 className="section-title">सल्लाहकारहरु</h3>
          <div className="advisors-grid">
            {advisors.map((group, groupIndex) => (
              <div key={groupIndex} className="advisor-group">
                <h4>{group.location}:</h4>
                <div className="advisors-list">
                  {group.members.map((advisor, advisorIndex) => (
                    <div key={advisorIndex} className="person-card">
                      {advisor.image ? (
                        <img src={advisor.image} alt={advisor.name} className="person-image" />
                      ) : (
                        <div className="image-upload-placeholder">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, advisor, (p) => {
                              const newAdvisors = [...advisors];
                              newAdvisors[groupIndex].members[advisorIndex] = p;
                              setAdvisors(newAdvisors);
                            })}
                            className="image-upload-input"
                          />
                          <span>Upload Image</span>
                        </div>
                      )}
                      <p>{advisor.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 