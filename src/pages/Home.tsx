import React from 'react';

const Home: React.FC = () => {
  return (
    <main className="main-content">
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