import PolicyLayout from "../components/legal/PolicyLayout";

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      description="Your privacy is important to us. This Privacy Policy explains how Pari Jewels collects, uses, and protects your personal information when you use our website."
    >
      <section className="space-y-10 text-gray-700">

        <PolicySection
          title="1. Information We Collect"
          content={[
            "We may collect personal information such as your name, email address, phone number, shipping address, and payment details when you place an order or create an account.",
            "We also collect basic technical information such as browser type, device information, and IP address to improve our services.",
          ]}
        />

        <PolicySection
          title="2. How We Use Your Information"
          content={[
            "To process and deliver your orders.",
            "To communicate order updates and customer support.",
            "To improve our products, website, and shopping experience.",
            "To comply with legal obligations and prevent fraudulent activities.",
          ]}
        />

        <PolicySection
          title="3. Payment Information"
          content={[
            "Online payments are securely processed through trusted third-party payment gateways such as Razorpay.",
            "Pari Jewels does not store your debit card, credit card, UPI PIN, CVV, or banking credentials on our servers.",
          ]}
        />

        <PolicySection
          title="4. Cookies"
          content={[
            "Our website may use cookies to improve website functionality, remember user preferences, and analyze website traffic.",
            "You may disable cookies through your browser settings; however, some website features may not function properly.",
          ]}
        />

        <PolicySection
          title="5. Data Security"
          content={[
            "We implement reasonable security measures to protect your personal information from unauthorized access, misuse, or disclosure.",
            "While we strive to protect your information, no internet transmission or electronic storage system can be guaranteed as completely secure.",
          ]}
        />

        <PolicySection
          title="6. Third-Party Services"
          content={[
            "Our website integrates trusted third-party services including payment gateways, authentication providers, and cloud storage services.",
            "These providers have their own privacy policies governing how your information is handled.",
          ]}
        />

        <PolicySection
          title="7. Your Rights"
          content={[
            "You may request correction or deletion of your personal information by contacting us.",
            "You may also contact us if you have questions regarding how your information is used.",
          ]}
        />

        <PolicySection
          title="8. Contact Us"
          content={[
            "If you have any questions regarding this Privacy Policy, please contact Pari Jewels through the Contact Us page or our official Instagram account.",
          ]}
        />

      </section>
    </PolicyLayout>
  );
}

function PolicySection({
  title,
  content,
}: {
  title: string;
  content: string[];
}) {
  return (
    <section>

      <h2 className="text-2xl font-bold text-[#3D2430]">
        {title}
      </h2>

      <ul className="mt-5 list-disc space-y-3 pl-6 leading-8">

        {content.map((item) => (
          <li key={item}>{item}</li>
        ))}

      </ul>

    </section>
  );
}