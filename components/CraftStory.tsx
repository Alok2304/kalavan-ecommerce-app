import Link from "next/link";

const CraftStory = () => {
  return (
	<section
	  className="py-20 lg:py-28 px-6 lg:px-[6vw]"
	  style={{ backgroundColor: "#FAF7F2" }}
	>
	  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
		{/* Text side */}
		<div>
		  <p
			className="text-[10px] tracking-[0.25em] font-medium uppercase mb-5"
			style={{ color: "#B85C38" }}
		  >
			The Story Behind the Craft
		  </p>
		  <h2
			className="font-serif text-3xl lg:text-4xl font-semibold leading-snug mb-6"
			style={{ color: "#2C2416" }}
		  >
			Tradition, Passed
			<br />
			<em>From Hand to Hand</em>
		  </h2>
		  <p
			className="text-base leading-relaxed mb-8 max-w-md"
			style={{ color: "#6B5B4E" }}
		  >
			For generations, the weavers of Yeola have passed down the art of
			Paithani on handlooms that have outlasted empires. Each piece takes
			weeks of patient work — motifs drawn from nature, colours drawn from
			tradition. When you hold a Kalavana product, you hold that
			inheritance.
		  </p>
		  <Link
			href="/about"
			className="inline-flex items-center gap-2 border-b border-terracotta pb-0.5 text-sm font-medium tracking-wide text-terracotta transition-colors duration-200 hover:border-charcoal hover:text-charcoal"
		  >
			Read Craft Stories
			<svg
			  width="14"
			  height="14"
			  viewBox="0 0 24 24"
			  fill="none"
			  stroke="currentColor"
			  strokeWidth="2"
			>
			  <path
				d="M5 12h14M12 5l7 7-7 7"
				strokeLinecap="round"
				strokeLinejoin="round"
			  />
			</svg>
		  </Link>
		</div>

		{/* Image */}
		<div className="relative">
		  <div
			className="overflow-hidden"
			style={{ borderRadius: 2, backgroundColor: "#E8DDD0" }}
		  >
			<img
			  src="https://images.unsplash.com/photo-1640292343595-889db1c8262e?w=800&h=640&fit=crop&auto=format"
			  alt="A man working at a traditional weaving machine"
			  className="w-full object-cover"
			  style={{ aspectRatio: "5/4" }}
			/>
		  </div>
		  {/* Decorative label */}
		  <div
			className="absolute -bottom-3 -left-3 px-4 py-2 hidden lg:block"
			style={{ backgroundColor: "#FAF7F2", border: "1px solid #D4C9BC" }}
		  >
			<p
			  className="text-[10px] tracking-widest uppercase"
			  style={{ color: "#6B5B4E" }}
			>
			  Est. 800 CE · Paithani, Maharashtra
			</p>
		  </div>
		</div>
	  </div>
	</section>
  );
};

export default CraftStory;

