import { Product, BlogPost } from './types';

// Featured products data
export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Tech Windbreaker',
    subtitle: 'Waterproof',
    description: 'Engineered with weather-adaptive fabric technology, the Tech Windbreaker combines futuristic design with practical urban functionality. Water-resistant outer shell with thermal regulation for all-season comfort.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1559551409-dadc959f76b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'men',
    collection: 'urban',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'blue', hex: '#0066CC' },
      { name: 'red', hex: '#FF3366' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: [
      'Weather-adaptive fabric technology',
      'Water-resistant outer shell',
      'Thermal regulation lining',
      '4 exterior pockets, 2 interior pockets',
      'Adjustable hood and cuffs',
      'Reflective elements for visibility'
    ],
    isNew: true,
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: '2',
    name: 'Urban Cargo Pants',
    subtitle: 'Streetwear',
    description: 'Versatile and functional cargo pants designed for the urban landscape. Features multiple pockets, adjustable waist, and durable fabric with a slight stretch for all-day comfort.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1588117260148-b47818741c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'men',
    collection: 'quantum',
    colors: [
      { name: 'olive', hex: '#556B2F' },
      { name: 'gray', hex: '#4B5563' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    details: [
      'Cotton blend fabric with 3% elastane for comfort',
      'Six pocket design: two front, two back, two cargo',
      'Adjustable straps at ankle',
      'Reinforced knees and seat',
      'YKK zippers'
    ],
    rating: 4.7,
    reviewCount: 94
  },
  {
    id: '3',
    name: 'Neon Accent Sneakers',
    subtitle: 'Limited Edition',
    description: 'Ultra-lightweight performance sneakers with eye-catching neon accents. Features responsive cushioning, breathable mesh upper, and durable traction pattern for urban terrain.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1597033130343-925cb110d0be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1548369735-f548cbe6a294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1575456456278-936c89ccdb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'accessories',
    collection: 'neon',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'white', hex: '#ffffff' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    details: [
      'Mesh and synthetic upper for breathability',
      'Cushioned EVA midsole for comfort',
      'Reflective details for visibility at night',
      'Rubber outsole for traction',
      'Neon green accents',
      'Pull tab on heel for easy on/off'
    ],
    isTrending: true,
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: '4',
    name: 'Quantum Tech Jacket',
    subtitle: 'Weather-Adaptive',
    description: 'Engineered with weather-adaptive fabric technology, the Quantum Tech Jacket combines futuristic design with practical urban functionality. Water-resistant outer shell with thermal regulation for all-season comfort.',
    price: 189.99,
    images: [
      'https://images.unsplash.com/photo-1617952236317-460627867943?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1617952236333-6f7170e2f115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
      'https://images.unsplash.com/photo-1617952236644-3e3a57884ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
      'https://images.unsplash.com/photo-1559582146-12b52b0e8fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
    ],
    category: 'men',
    collection: 'quantum',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'blue', hex: '#0066CC' },
      { name: 'red', hex: '#FF3366' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: [
      'Weather-adaptive fabric technology',
      'Water-resistant outer shell',
      'Thermal regulation lining',
      '4 exterior pockets, 2 interior pockets',
      'Adjustable hood and cuffs',
      'Reflective elements for visibility'
    ],
    rating: 4.5,
    reviewCount: 128
  }
];

// Products data
export const products: Product[] = [
  ...featuredProducts,
  {
    id: '5',
    name: 'Neon Stripe Hoodie',
    subtitle: 'Streetwear',
    description: 'Oversized hoodie with vibrant neon stripe detail. Made from premium cotton blend for maximum comfort and style.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1578175351409-4a581cba5304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1590189272815-2a3657be6cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1580985325083-6a1b52651a54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'men',
    collection: 'neon',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'gray', hex: '#4B5563' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    rating: 4.6,
    reviewCount: 82
  },
  {
    id: '6',
    name: 'Urban Tech Backpack',
    subtitle: 'Accessories',
    description: 'Water-resistant backpack with anti-theft technology and USB charging port. Perfect for the urban commuter.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1554410307-233a51ce5ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'accessories',
    collection: 'urban',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'gray', hex: '#4B5563' }
    ],
    details: [
      'Water-resistant nylon material',
      'Hidden anti-theft pocket',
      'USB charging port',
      'Padded laptop compartment (fits up to 15.6")',
      'Adjustable padded straps',
      'Top handle for easy carrying'
    ],
    rating: 4.9,
    reviewCount: 134
  },
  {
    id: '7',
    name: 'Reflective Running Jacket',
    subtitle: 'Performance',
    description: 'Lightweight running jacket with 360° reflectivity for visibility during night runs. Features moisture-wicking fabric and ventilation for maximum comfort.',
    price: 99.99,
    images: [
      'https://images.unsplash.com/photo-1543076659-9380cdf10613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1598346762291-aee88549193f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'women',
    collection: 'urban',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'silver', hex: '#C0C0C0' },
      { name: 'neon', hex: '#CCFF00' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isTrending: true,
    rating: 4.7,
    reviewCount: 91
  },
  {
    id: '8',
    name: 'Tech Utility Shorts',
    subtitle: 'Urban Sport',
    description: 'Technical utility shorts designed for urban exploration. Features quick-dry fabric, multiple pockets, and stretch waistband for comfort.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1617740084888-d1995488183d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1596336893725-43d309589935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'men',
    collection: 'urban',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'olive', hex: '#556B2F' },
      { name: 'navy', hex: '#000080' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    isNew: true,
    rating: 4.5,
    reviewCount: 78
  },
  {
    id: '9',
    name: 'Quantum Cropped Hoodie',
    subtitle: 'Women\'s Streetwear',
    description: 'Trendy cropped hoodie with modern relaxed fit. Features premium cotton blend and raw edge details for an urban aesthetic.',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1565537222174-2b3ca62f2da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1624280157150-4d1ed7075d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'women',
    collection: 'quantum',
    colors: [
      { name: 'gray', hex: '#4B5563' },
      { name: 'mauve', hex: '#E0B0FF' },
      { name: 'black', hex: '#000000' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.6,
    reviewCount: 104
  },
  {
    id: '10',
    name: 'Tactical Urban Vest',
    subtitle: 'Utility Wear',
    description: 'Multi-pocket tactical vest designed for urban functionality. Features lightweight, water-resistant fabric with adjustable fit.',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1589810635657-232948472d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1600434481049-2cd0badf5d68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ],
    category: 'men',
    collection: 'quantum',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'olive', hex: '#556B2F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isTrending: true,
    rating: 4.8,
    reviewCount: 86
  }
];

// Journal posts data
export const journalPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Urban Style Guide 2024',
    slug: 'urban-style-guide-2024',
    excerpt: 'Discover the latest street style trends that are defining urban fashion this season and how to incorporate them into your wardrobe.',
    content: `
      <p>As we dive into 2024, urban streetwear continues to evolve, blending technical innovation with bold aesthetic choices. This year's dominant trends reflect a post-digital reality where functionality meets self-expression in exciting new ways.</p>
      
      <h2>Tech-Infused Staples</h2>
      <p>Technical fabrics have moved beyond athletic wear into everyday streetwear. Look for pieces with water-resistant coatings, heat-reactive dyes, and antimicrobial properties. The modern urban wardrobe embraces functionality without sacrificing style.</p>
      
      <h2>Neo-Utility</h2>
      <p>Multi-pocket designs, modular attachments, and convertible garments dominate this season. The urban explorer aesthetic celebrates adaptability with tactical vests, cargo pants, and utility jackets in sleek, streamlined silhouettes.</p>
      
      <h2>Digital-Physical Crossover</h2>
      <p>QR-embedded graphics, AR-enhanced prints, and designs inspired by digital artifacts bring a futuristic edge to street style. This convergence of physical garments with digital experience creates a new playground for self-expression.</p>
      
      <h2>How to Style</h2>
      <p>The key to mastering 2024 urban style is thoughtful layering. Combine technical outerwear with comfortable basics, add statement accessories with functional benefits, and don't be afraid to mix utilitarian pieces with more refined elements for contrast.</p>
      
      <p>As always, true urban style comes from authentic self-expression. Use these trends as a starting point, but make them your own through unexpected combinations and personal touches.</p>
    `,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'trends',
    author: 'Alex Morgan',
    publishDate: '2024-01-15',
    tags: ['streetwear', 'trends', 'urban fashion', 'style guide']
  },
  {
    id: '2',
    title: 'Tech-Fabric Revolution',
    slug: 'tech-fabric-revolution',
    excerpt: 'How advanced materials are changing the game in streetwear, from moisture-wicking to temperature-adaptive fabrics.',
    content: `
      <p>The urban fashion landscape is being transformed by an invisible revolution: advanced technical fabrics that bring unprecedented functionality to streetwear. No longer confined to performance sportswear, these innovative materials are redefining what we expect from our everyday clothing.</p>
      
      <h2>Beyond Cotton: The New Generation</h2>
      <p>Today's technical fabrics go far beyond traditional performance materials. New innovations include fabrics that regulate body temperature, neutralize odors, protect against UV rays, and even generate small amounts of electricity from movement to power embedded devices.</p>
      
      <h2>Sustainability Meets Performance</h2>
      <p>Perhaps the most exciting development is the convergence of sustainability with high performance. Recycled ocean plastics transformed into water-resistant outerwear, biodegradable synthetic blends, and carbon-negative manufacturing processes are making tech fabrics environmentally responsible.</p>
      
      <h2>Key Players in the Space</h2>
      <p>Brands like Baff-Me are at the forefront of integrating these materials into street-ready designs without sacrificing style. Our Quantum Tech Jacket, for instance, uses a proprietary fabric that adapts to both weather conditions and body temperature while maintaining a distinctly urban aesthetic.</p>
      
      <h2>Caring for Technical Garments</h2>
      <p>To maximize the lifespan of your technical pieces, follow care instructions carefully. Many advanced fabrics require specific washing conditions to maintain their performance properties. Generally, cold water washing, air drying, and avoiding fabric softeners will help preserve functionality.</p>
      
      <p>The tech fabric revolution isn't just changing how our clothes perform—it's changing our relationship with clothing itself, creating garments that actively respond to our needs and environment rather than simply covering us.</p>
    `,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'innovation',
    author: 'Jade Kim',
    publishDate: '2024-02-03',
    tags: ['tech fabric', 'innovation', 'sustainability', 'performance']
  },
  {
    id: '3',
    title: 'Sustainable Urban Fashion',
    slug: 'sustainable-urban-fashion',
    excerpt: 'How the streetwear industry is embracing eco-friendly practices and why it matters for the future of fashion.',
    content: `
      <p>Sustainability has evolved from a niche concern to a central focus in urban fashion. Today's conscious consumers expect more than just style—they demand transparency, ethical production, and environmental responsibility. The streetwear industry is responding with innovative approaches that prove sustainability and street credibility can coexist.</p>
      
      <h2>Beyond Greenwashing</h2>
      <p>True sustainability goes deeper than recycled packaging or token organic cotton pieces. Leading streetwear brands are rethinking entire supply chains, from material sourcing to manufacturing processes to distribution methods. This holistic approach reflects a commitment to substantive change rather than marketing-driven "greenwashing."</p>
      
      <h2>Circular Design Philosophy</h2>
      <p>The most forward-thinking brands are embracing circularity—designing products with their entire lifecycle in mind. This includes using biodegradable materials, creating easily recyclable products, offering repair services, and establishing take-back programs that give old garments new life.</p>
      
      <h2>Community Impact</h2>
      <p>Sustainable urban fashion also considers social sustainability. Ethical labor practices, fair wages, and community investment programs ensure that streetwear's positive impact extends to the people who make the clothes we love.</p>
      
      <h2>Baff-Me's Approach</h2>
      <p>At Baff-Me, we've implemented a three-pillar sustainability framework: Materials (prioritizing recycled, organic, and innovative eco-materials), Process (reducing water and energy consumption while eliminating harmful chemicals), and People (ensuring ethical working conditions throughout our supply chain).</p>
      
      <p>As urban fashion continues to evolve, sustainability isn't just a responsibility—it's an opportunity for creative innovation that pushes the industry forward while preserving the planet for future generations of streetwear enthusiasts.</p>
    `,
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'sustainability',
    author: 'Marcus Chen',
    publishDate: '2024-02-21',
    tags: ['sustainability', 'eco-friendly', 'ethical fashion', 'circular design']
  },
  {
    id: '4',
    title: 'Street Culture: From Subculture to Mainstream',
    slug: 'street-culture-evolution',
    excerpt: 'Tracing the evolution of street culture from underground movements to global influence in fashion, art, and music.',
    content: `
      <p>What began as localized expressions of identity and resistance has evolved into a global cultural force. Street culture—encompassing fashion, art, music, and lifestyle—has transcended its origins to influence every aspect of contemporary culture while maintaining its essential creative energy.</p>
      
      <h2>Roots and Evolution</h2>
      <p>Street culture emerged from urban environments where young people created distinctive styles as expressions of identity. From hip-hop in the Bronx to skateboarding in Southern California to grime in East London, these movements developed unique visual languages that reflected their social realities.</p>
      
      <h2>Digital Acceleration</h2>
      <p>The internet democratized street culture, allowing regional styles to gain global visibility practically overnight. This digital connectivity accelerated cross-pollination between scenes and brought street aesthetics to wider audiences, catalyzing the mainstream crossover.</p>
      
      <h2>High Fashion Influence</h2>
      <p>Perhaps the most visible marker of street culture's ascendance is its embrace by high fashion. Luxury brands now regularly collaborate with streetwear labels, adopt street-inspired design elements, and court street culture figures as brand ambassadors and creative directors.</p>
      
      <h2>Preserving Authenticity</h2>
      <p>As street culture has gained commercial power, questions of authenticity and appropriation have become increasingly important. The challenge for brands like Baff-Me is to honor street culture's heritage while pushing its boundaries—respecting its roots while contributing to its evolution.</p>
      
      <p>The mainstreaming of street culture hasn't diminished its power; it has multiplied its impact. Today's street-influenced fashion continues to embody the creativity, authenticity, and cultural commentary that made it revolutionary in the first place.</p>
    `,
    image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'culture',
    author: 'Sofia Rodriguez',
    publishDate: '2024-03-05',
    tags: ['street culture', 'fashion history', 'subculture', 'mainstream']
  },
  {
    id: '5',
    title: 'The Art of Layering: Urban Style for Changing Seasons',
    slug: 'art-of-layering-urban-style',
    excerpt: 'Master the essential skill of layering with our comprehensive guide to creating versatile, weather-adaptive urban outfits.',
    content: `
      <p>Layering is more than a practical response to unpredictable weather—it's an art form that allows for personal expression while maximizing the versatility of your wardrobe. In urban fashion, thoughtful layering creates depth, dimension, and adaptability.</p>
      
      <h2>Foundation Principles</h2>
      <p>Successful layering starts with understanding three key principles: progression (thinnest layers closest to the body, moving outward to heavier pieces), proportion (balancing volume between layers), and texture mixing (creating visual interest through contrasting materials).</p>
      
      <h2>Essential Layers</h2>
      <p>Build your layering wardrobe around versatile pieces: technical base layers, oversized tees, lightweight hoodies, utility vests, shirt jackets, and weather-adaptive outerwear. The Baff-Me Quantum collection is designed specifically with layering in mind, with pieces that work individually or combined.</p>
      
      <h2>Spring/Fall Transitions</h2>
      <p>For unpredictable transitional seasons, focus on adaptable combinations. A moisture-wicking tee under an open overshirt, topped with a lightweight jacket creates a system that can be adjusted throughout the day as conditions change.</p>
      
      <h2>Winter Urban Strategy</h2>
      <p>Urban winter style requires balancing warmth with mobility. Opt for a thermal base layer under a heavyweight tee, add a technical hoodie, and top with our Urban Tech Jacket. This combination delivers exceptional warmth without the bulk of traditional winter wear.</p>
      
      <p>The most compelling layered looks maintain a cohesive aesthetic while showcasing thoughtful details. Each layer should stand on its own while contributing to a unified whole—a philosophy that defines contemporary urban style.</p>
    `,
    image: 'https://images.unsplash.com/photo-1624634214875-c40a05a9f14a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'style',
    author: 'Nate Williams',
    publishDate: '2024-03-18',
    tags: ['layering', 'seasonal style', 'urban fashion', 'versatility']
  },
  {
    id: '6',
    title: 'Digital Fashion: Virtual Clothing and the Future of Streetwear',
    slug: 'digital-fashion-future-streetwear',
    excerpt: 'Exploring how virtual clothing, NFTs, and digital fashion experiences are creating new possibilities for streetwear expression.',
    content: `
      <p>As our lives increasingly bridge physical and digital spaces, fashion is following suit. Digital fashion—clothing created for virtual environments—is emerging as a revolutionary force in streetwear, offering new creative possibilities and challenging fundamental assumptions about what clothing can be.</p>
      
      <h2>Beyond Physical Constraints</h2>
      <p>Digital fashion liberates designers from material limitations. Gravity-defying silhouettes, impossible textures, and dynamic color-changing effects become possible when clothing exists in virtual space. This freedom is fostering unprecedented creative experimentation.</p>
      
      <h2>Virtual Collectibles</h2>
      <p>Limited-edition digital garments, often secured by blockchain technology as NFTs (Non-Fungible Tokens), are becoming prized collectibles. These virtual pieces offer the exclusivity and cultural cachet traditionally associated with rare physical streetwear, with the added benefits of verified authenticity and provenance.</p>
      
      <h2>Phygital Experiences</h2>
      <p>The most interesting development may be the blurring boundary between physical and digital fashion. Augmented reality try-ons, physical garments with QR-triggered digital twins, and real clothing designed to optimize appearance in video calls and social media represent the emerging "phygital" landscape.</p>
      
      <h2>Baff-Me Digital</h2>
      <p>Our upcoming Baff-Me Digital collection will explore this frontier with AR-enhanced physical garments and limited digital collectibles, allowing our community to express their style identity across physical and virtual spaces.</p>
      
      <p>Digital fashion isn't replacing physical clothing—it's expanding what fashion can be. As our identities increasingly exist across multiple realms, digital fashion offers new ways to express ourselves, connect with others, and push the boundaries of creativity.</p>
    `,
    image: 'https://images.unsplash.com/photo-1635942173617-adea8a242476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'innovation',
    author: 'Jade Kim',
    publishDate: '2024-04-02',
    tags: ['digital fashion', 'NFTs', 'virtual clothing', 'innovation']
  }
];

// Helper function to get products by filter criteria
export const getFilteredProducts = (
  categoryFilter?: string,
  collectionFilter?: string,
  priceRange?: [number, number],
  sortBy?: string
): Product[] => {
  let filtered = [...products];
  
  // Apply category filter
  if (categoryFilter) {
    filtered = filtered.filter(product => product.category === categoryFilter);
  }
  
  // Apply collection filter
  if (collectionFilter) {
    filtered = filtered.filter(product => product.collection === collectionFilter);
  }
  
  // Apply price range filter
  if (priceRange) {
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }
  
  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        // Newest is default, products are already sorted by newest
        break;
    }
  }
  
  return filtered;
};

// Helper function to get related products
export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  // Find products in the same category or collection, excluding the current product
  const related = products.filter(p => 
    p.id !== productId && (
      p.category === product.category || 
      p.collection === product.collection
    )
  );
  
  // Return a limited number of related products
  return related.slice(0, limit);
};

// Helper function to get featured journal posts
export const getFeaturedJournalPosts = (limit: number = 3): BlogPost[] => {
  return journalPosts.slice(0, limit);
};

// Helper function to get journal post by slug
export const getJournalPostBySlug = (slug: string): BlogPost | undefined => {
  return journalPosts.find(post => post.slug === slug);
};
