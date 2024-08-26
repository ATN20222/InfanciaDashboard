import React from 'react';
import TopImage from '../../Assets/images/HeaderLogo.png';
import './Policies.css'
const PrivacyPolicy = () => {
  return (
    <div className="RegisterMain">
   
    <div className="TopImage">
        <img src={TopImage} width="200px" alt="" />
    </div>

    <div className="container">

        <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p>Last updated: August 26, 2024</p>

        <p>
            Welcome to Infancia Nursery Management System. We are committed to protecting your personal data and your privacy. This Privacy Policy outlines how we collect, use, and share information about you when you use our services, including our mobile applications available on Google Play and the Apple App Store.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect and process the following types of information:</p>
        <ul>
            <li>
            <strong>Personal Information:</strong> When you sign up, we collect your name, email address, phone number, and other relevant details.
            </li>
            <li>
            <strong>Child Information:</strong> Information about the children enrolled in the nursery, including their name, birth date, and health-related details.
            </li>
            <li>
            <strong>Usage Data:</strong> Information about how you use our services, such as features used and the time spent on the app.
            </li>
            <li>
            <strong>Device Information:</strong> Data about your device, including your IP address, device type, and operating system.
            </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
            <li>To provide, operate, and maintain our services.</li>
            <li>To communicate with you, including sending notifications related to your account or services.</li>
            <li>To improve our services, based on usage data and feedback.</li>
            <li>To comply with legal obligations and protect our legal rights.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>
            We do not share your personal information with third parties except in the following circumstances:
        </p>
        <ul>
            <li>With your consent.</li>
            <li>With service providers who assist us in operating our services.</li>
            <li>To comply with legal obligations or respond to lawful requests.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
            We take appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of receiving promotional communications from us.</li>
            <li>Request a copy of the personal data we hold about you.</li>
        </ul>

        <h2>6. Children's Privacy</h2>
        <p>
            Our services are intended for use by nurseries and parents. We do not knowingly collect personal information from children under the age of 13 without parental consent. If we discover that we have collected information from a child under 13 without verification of parental consent, we will take steps to delete that information.
        </p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2>8. Contact Us</h2>
        <p>
            If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>
            Email: <a href="mailto:support@infancia.com">support@infancia.com</a>
        </p>
        </div>
    </div>
    </div>
    
  );
};

export default PrivacyPolicy;
