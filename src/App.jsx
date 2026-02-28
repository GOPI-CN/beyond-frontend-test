// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && (!formData.fullName || !formData.email)) {
      alert('Please fill out all fields in Step 1.');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert('Please select a role and agree to the terms.');
      return;
    }
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="app-container">
        <div>
          <h1>Summary</h1>
          <div className="summary">
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Role:</strong> {formData.role}</p>
            <p><strong>Accepted Terms:</strong> {formData.termsAgreed ? 'Yes' : 'No'}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({
                fullName: '',
                email: '',
                role: '',
                termsAgreed: false,
              });
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div>
        <h1>Multi-Step Form</h1>
        <form onSubmit={handleSubmit} className="form-container">
          {currentStep === 1 && (
            <div>
              <h2>Step 1: Details</h2>
              <input
                name="fullName"
                placeholder="First Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.fullName || !formData.email}
              >
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2>Step 2: Role</h2>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              <label>
                <input
                  type="checkbox"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                />
                Accept Terms & Conditions
              </label>
              <div style={{ marginTop: '10px' }}>
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit" disabled={!formData.role}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
