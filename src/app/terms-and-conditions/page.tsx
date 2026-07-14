import PolicyLayout from "../components/legal/PolicyLayout";

export default function TermsAndConditionsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      description="Please read these Terms & Conditions carefully before using the Pari Jewels website. By accessing or placing an order, you agree to these terms."
    >
      <section className="space-y-10 text-gray-700">

        <PolicySection
          title="1. Acceptance of Terms"
          content={[
            "By accessing or using the Pari Jewels website, you agree to comply with these Terms & Conditions.",
            "If you do not agree with any part of these terms, please do not use our website.",
          ]}
        />

        <PolicySection
          title="2. Products"
          content={[
            "Pari Jewels offers fashion jewellery and accessories for customers across India.",
            "We make every effort to display product images and descriptions accurately. However, slight variations in color or appearance may occur due to photography and screen settings.",
          ]}
        />

        <PolicySection
          title="3. Pricing"
          content={[
            "All prices displayed on the website are in Indian Rupees (INR).",
            "Prices are subject to change without prior notice.",
            "Applicable taxes and delivery charges, if any, will be shown during checkout.",
          ]}
        />

        <PolicySection
          title="4. Orders"
          content={[
            "All orders are subject to acceptance and availability.",
            "Pari Jewels reserves the right to refuse or cancel any order due to pricing errors, suspected fraud, or unforeseen circumstances.",
          ]}
        />

        <PolicySection
          title="5. Payments"
          content={[
            "We accept secure online payments through trusted payment gateways as well as Cash on Delivery (where available).",
            "Your payment information is securely handled by our payment service providers.",
          ]}
        />

        <PolicySection
          title="6. Shipping & Delivery"
          content={[
            "Orders are processed and shipped within the timelines mentioned in our Shipping Policy.",
            "Delivery times may vary depending on the destination and courier partner.",
          ]}
        />

        <PolicySection
          title="7. Cancellation & Refund"
          content={[
            "Order cancellation and refund requests are governed by our Cancellation & Refund Policy.",
            "Please review the policy before placing an order.",
          ]}
        />

        <PolicySection
          title="8. Intellectual Property"
          content={[
            "All website content including text, logos, graphics, product images, and designs are the property of Pari Jewels unless otherwise stated.",
            "Unauthorized copying, reproduction, or distribution is prohibited.",
          ]}
        />

        <PolicySection
          title="9. Limitation of Liability"
          content={[
            "Pari Jewels shall not be liable for indirect, incidental, or consequential damages arising from the use of this website or purchased products, except as required under applicable law.",
          ]}
        />

        <PolicySection
          title="10. Governing Law"
          content={[
            "These Terms & Conditions shall be governed by the laws of India.",
            "Any disputes arising from the use of this website shall be subject to the jurisdiction of the competent courts in India.",
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
          <li key={item}>
            {item}
          </li>
        ))}

      </ul>

    </section>
  );
}