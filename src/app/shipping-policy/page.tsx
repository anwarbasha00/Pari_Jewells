import PolicyLayout from "../components/legal/PolicyLayout";

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      description="At Pari Jewels, we strive to deliver your orders safely and on time. Please read our Shipping Policy to understand our shipping process and delivery timelines."
    >
      <section className="space-y-10 text-gray-700">

        <PolicySection
          title="1. Order Processing"
          content={[
            "Orders are processed after successful payment confirmation or order confirmation for Cash on Delivery (COD) orders.",
            "Orders are typically processed within 1–2 business days, excluding Sundays and public holidays.",
          ]}
        />

        <PolicySection
          title="2. Delivery Coverage"
          content={[
            "Pari Jewels currently delivers products across India.",
            "Delivery availability depends on the serviceability of your location by our courier partners.",
          ]}
        />

        <PolicySection
          title="3. Estimated Delivery Time"
          content={[
            "Metro Cities: 3–5 business days.",
            "Other Cities & Towns: 5–7 business days.",
            "Remote Locations: Delivery may take 7–10 business days depending on courier availability.",
          ]}
        />

        <PolicySection
          title="4. Shipping Charges"
          content={[
            "Shipping charges, if applicable, will be displayed during checkout before payment.",
            "Any promotional free shipping offers will be clearly communicated on the website.",
          ]}
        />

        <PolicySection
          title="5. Order Tracking"
          content={[
            "Once your order is shipped, tracking information will be shared if available.",
            "Customers can also contact our support team for shipment updates.",
          ]}
        />

        <PolicySection
          title="6. Delivery Delays"
          content={[
            "Delivery timelines are estimates and may be affected by weather conditions, courier delays, festivals, public holidays, or other unforeseen circumstances.",
            "Pari Jewels is not responsible for delays caused by third-party courier services, but we will assist in resolving delivery issues whenever possible.",
          ]}
        />

        <PolicySection
          title="7. Incorrect Shipping Address"
          content={[
            "Customers are responsible for providing accurate shipping information.",
            "Pari Jewels will not be responsible for delays or failed deliveries due to incorrect or incomplete addresses provided by the customer.",
          ]}
        />

        <PolicySection
          title="8. Damaged Package"
          content={[
            "If your package appears damaged during delivery, please notify the delivery partner immediately and contact Pari Jewels as soon as possible.",
            "Please retain photographs of the package and product to help us investigate and resolve the issue.",
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