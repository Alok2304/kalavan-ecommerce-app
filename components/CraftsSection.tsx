import Link from "next/link";

const crafts = [
	{
		name: "Paithani",
		tradition: "Silk Weaving · Yeola & Paithan",
		image:
			"https://images.unsplash.com/photo-1786871204247-60f342ae81a8?w=600&h=400&fit=crop&auto=format",
		alt: "Handwoven Paithani silk on a loom",
	},
	{
		name: "Warli Art",
		tradition: "Tribal Painting · Palghar District",
		image:
			"https://images.unsplash.com/photo-1640292343595-889db1c8262e?w=600&h=400&fit=crop&auto=format",
		alt: "Artisan at a traditional weaving machine",
	},
	{
		name: "Sawantwadi Craft",
		tradition: "Lacquerware · Sindhudurg",
		image:
			"https://images.unsplash.com/photo-1712210332599-0cb76e647e43?w=600&h=400&fit=crop&auto=format",
		alt: "Artisan with handcrafted lacquerware",
	},
	{
		name: "Kolhapuri Craft",
		tradition: "Leather & Jewellery · Kolhapur",
		image:
			"https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&h=400&fit=crop&auto=format",
		alt: "Traditional Kolhapuri jewellery",
	},
	{
		name: "Terracotta",
		tradition: "Clay Craft · Nashik & Pune",
		image:
			"https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=400&fit=crop&auto=format",
		alt: "Terracotta pottery being shaped on a wheel",
	},
	{
		name: "Bamboo Craft",
		tradition: "Tribal Weaving · Gadchiroli",
		image:
			"https://images.unsplash.com/photo-1764218057040-5427eb0f1f5a?w=600&h=400&fit=crop&auto=format",
		alt: "Handmade bamboo and cane crafts",
	},
];

function CraftCard({ name, tradition, image, alt }: (typeof crafts)[0]) {
	return (
		<Link href="/crafts" className="group block" style={{ borderRadius: 2 }}>
			<div
				className="relative overflow-hidden"
				style={{
					paddingBottom: "66%",
					backgroundColor: "#E8DDD0",
					borderRadius: 2,
				}}
			>
				<img
					src={image}
					alt={alt}
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(to top, rgba(44,36,22,0.6) 0%, transparent 55%)",
					}}
				/>
				<div className="absolute bottom-0 left-0 right-0 p-4">
					<h3
						className="font-serif text-lg font-semibold"
						style={{ color: "#FAF7F2" }}
					>
						{name}
					</h3>
					<p className="text-xs mt-0.5" style={{ color: "#D4C9BC" }}>
						{tradition}
					</p>
				</div>
			</div>
			<div className="mt-3">
				<span
					className="inline-flex items-center gap-1 text-xs font-medium tracking-wide transition-colors duration-200 group-hover:gap-2"
					style={{ color: "#B85C38" }}
				>
					Explore
					<svg
						width="12"
						height="12"
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
				</span>
			</div>
		</Link>
	);
}

const CraftsSection = () => {
	return (
		<section
			className="py-20 lg:py-28 px-6 lg:px-[6vw]"
			style={{ backgroundColor: "#F4EFE8" }}
		>
			<div className="text-center mb-12 lg:mb-16">
				<p
					className="text-xs tracking-[0.2em] uppercase mb-3 font-medium"
					style={{ color: "#B85C38" }}
				>
					Cultural Heritage
				</p>
				<h2
					className="font-serif text-3xl lg:text-4xl font-semibold"
					style={{ color: "#2C2416" }}
				>
					Crafts of Maharashtra
				</h2>
				<p
					className="mt-4 max-w-md mx-auto text-sm leading-relaxed"
					style={{ color: "#6B5B4E" }}
				>
					Six centuries of tradition, still alive in the hands of today&apos;s
					artisans.
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				{crafts.map((craft) => (
					<CraftCard key={craft.name} {...craft} />
				))}
			</div>
		</section>
	);
};

export default CraftsSection;

