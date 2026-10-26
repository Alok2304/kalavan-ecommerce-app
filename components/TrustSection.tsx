const trustItems = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Made by Local Artisans",
    description:
      "Every product is handmade by skilled craftspeople from Maharashtra.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Authentic Craftsmanship",
    description:
      "Traditional techniques preserved across generations of artisan families.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure Shopping",
    description: "Safe and encrypted checkout. Your data is always protected.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Supporting Traditional Craft",
    description:
      "Your purchase directly supports artisan livelihoods and craft preservation.",
  },
];

const TrustSection = () => {
  return (
    <section
      className="py-16 lg:py-20 px-6 lg:px-[6vw] border-t border-b"
      style={{ borderColor: "#D4C9BC", backgroundColor: "#FAF7F2" }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {trustItems.map((item) => (
          <div key={item.title} className="flex flex-col items-start gap-4">
            <div style={{ color: "#B85C38" }}>{item.icon}</div>
            <div>
              <h3
                className="font-serif text-base font-semibold mb-1.5"
                style={{ color: "#2C2416" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6B5B4E" }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
