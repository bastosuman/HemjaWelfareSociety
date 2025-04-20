import React, { useState } from 'react';
import './Updates.css';

interface Person {
  name: string;
  role?: string;
  image?: string;
}

interface AdvisorGroup {
  location: string;
  members: Person[];
}

const Updates: React.FC = () => {
  const [founder, setFounder] = useState<Person>({ name: 'विश्ब राज बाँस्तोला' });
  const [patrons, setPatrons] = useState<Person[]>([
    { name: 'गंगाधर त्रिपाठी' },
    { name: 'टेक ब. कुँवर' },
    { name: 'मोहन क्षेत्रि' },
    { name: 'ध्रुव कुँवर' }
  ]);
  const [committee, setCommittee] = useState<Person[]>([
    { name: 'ध्रुव राज पौंडेल', role: 'अध्यक्ष' },
    { name: 'पदम दाहाल', role: 'उपाध्यक्ष' },
    { name: 'लक्ष्मि थापा', role: 'म.उपाध्यक्ष' },
    { name: 'विश्व राज तिमिल्सिना', role: 'महासचिव' },
    { name: 'बिर ब.कुँवर', role: 'सचिव' },
    { name: 'लाल बहादुर जि.सि', role: 'कोषाध्यक्ष' },
    { name: 'पदम कुँवर', role: 'सदस्य' },
    { name: 'सुमन बाँस्तोला', role: 'सदस्य' },
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
    <div className="updates-container">
      <h1 className="updates-title">Updates</h1>
      
      <section className="meeting-section">
        <div className="meeting-header">
          <h2>तेस्रो बैठकबाट निम्न बिषय हरुमा छलफल गरी निर्णय गरियो</h2>
        </div>
        
        <div className="meeting-content">
          <div className="greeting">
            <p>यहाँहरु संम्पुर्णमा नमस्कार</p>
            <p>नयाँ बर्ष २०८२ सालको हार्दिक मंगलमय शुभकामना व्यक्त गर्दछौं॥</p>
          </div>

          <div className="meeting-info">
            <p>हाम्रो संस्था हेमजा वेलफेयर सोसाईटी स्थापना कालदेखि नैं बिभिन्न चरणहरु पार गर्दैं यहाँसम्म आएको कुरा यहाँहरुलाई थाहानैं छ तथापि हामिले गर्नुपर्ने र गर्नसक्ने कतिपय कुराहरु समयमा गर्न सकेनौं र भैंपरि आएका कतिपय परिघटनाहरुलाई हामिसबैंको सहयोगबाट समाधानपनि गर्यौं।अब हाम्रो काम भनेको संस्थालाई चलायमान बनाउने र प्रतेक हेमजाबासीहरुलाई संस्थामा आवद्द गराएर अरु उद्देश्यहरु पुरा गर्दैं संस्थालाई आर्थिक र सामाजिक रुपमा अझ संक्षम र सबल बनाई हाम्रो हेमजासम्म जोड्ने हो।त्यसको लागि यहाँहरुको साथ,समर्थन र सहयोगको अझ बढि आवस्यकता रहन्छ त्यसकारण यहाँहरुबाट धेरैं अपेक्षा राखेकाछौं र आउदा दिनहरुमा हामि क्रमश संस्थालाई सबल बनाउने तर्फ अगाडी बढ्ने छौं।</p>
            
            <p className="meeting-date">April 6, 2025 मा Hicksville मा सम्पन्न</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Updates; 