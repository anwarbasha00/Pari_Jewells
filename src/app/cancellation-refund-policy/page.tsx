import PolicyLayout from "../components/legal/PolicyLayout";

export default function CancellationRefundPolicyPage() {
  return (
    <PolicyLayout
      title="Cancellation & Refund Policy"
      description="We value your trust and strive to provide a smooth shopping experience. Please read our Cancellation & Refund Policy carefully before placing an order."
    >
      <section className="space-y-10 text-gray-700">

        <PolicySection
          title="1. Order Cancellation"
          content={[
            "Customers may request cancellation immediately after placing an order, provided the order has not been processed or shipped.",
            "Once an order has been confirmed for dispatch or shipped, cancellation requests may not be accepted.",
            "If your cancellation request is approved, the order status will be updated accordingly.",
          ]}
        />

        <PolicySection
          title="2. Online Payment Refunds"
          content={[
            "For eligible cancelled orders paid through online payment methods, the refund will be initiated to the original payment method.",
            "Refunds are generally processed within 5–7 business days after the cancellation is approved. The actual credit timeline may depend on your bank or payment provider.",
          ]}
        />

        <PolicySection
          title="3. Cash on Delivery (COD)"
          content={[
            "For Cash on Delivery orders, no refund is applicable since payment is collected only at the time of delivery.",
            "Eligible COD orders can still be cancelled before processing without any cancellation charges.",
          ]}
        />

        <PolicySection
          title="4. Damaged, Defective or Incorrect Products"
          content={[
            "If you receive a damaged, defective, or incorrect product, please contact our customer support within 48 hours of delivery.",
            "Please provide your order number along with clear photographs of the product and packaging to help us investigate the issue.",
            "Eligible requests will be reviewed, and an appropriate resolution such as replacement or refund will be provided where applicable.",
          ]}
        />

        <PolicySection
          title="5. Non-Refundable Situations"
          content={[
            "Refunds may not be provided for products damaged due to misuse, improper handling, or normal wear and tear after delivery.",
            "Requests made outside the applicable reporting period may not be eligible for refund or replacement.",
          ]}
        />

        <PolicySection
          title="6. Refund Processing"
          content={[
            "Approved refunds will be processed using the original payment method wherever possible.",
            "Pari Jewels is not responsible for delays caused by banks or payment service providers during the refund process.",
          ]}
        />

        <PolicySection
          title="7. Contact Us"
          content={[
            "For cancellation or refund assistance, please contact us through our Contact Us page or our official Instagram account. Our support team will be happy to assist you.",
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