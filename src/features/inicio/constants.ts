import type {
  HomeCategory,
  HomeProduct,
  HomeProductTone,
  HomeTestimonial,
  HomeValueProposition,
} from "./types";

export const BADGE_TONE_CLASS: Record<HomeProductTone, string> = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-secondary text-on-secondary",
  tertiary: "bg-tertiary text-on-tertiary",
  "primary-container": "bg-primary-container text-on-primary-container",
};

export const VALUE_PROPOSITIONS: HomeValueProposition[] = [
  { icon: "spa", iconClass: "text-primary", title: "Do Sousplat ao Tapete", description: "Peças para a casa e o dia a dia" },
  { icon: "handshake", iconClass: "text-secondary", title: "Pequenos Lotes", description: "Feito à mão com calma" },
  { icon: "nest_eco_leaf", iconClass: "text-tertiary", title: "Fios Naturais", description: "Amigurumi, bolsas e home & decor" },
  { icon: "downloading", iconClass: "text-primary-container", title: "Embalagem Afetiva", description: "Zero plástico & papel semente" },
];

export const CATEGORIES: HomeCategory[] = [
  {
    name: "Sousplat",
    image: "/inicio/cat-sousplat.jpg",
    imageAlt: "Sousplat de crochê cru sob prato de cerâmica com guardanapo de linho e eucalipto.",
  },
  {
    name: "Bolsas",
    image: "/inicio/cat-bolsas.jpg",
    imageAlt: "Bolsa tote de crochê em algodão cru pendurada em um cabideiro de madeira.",
  },
  {
    name: "Amigurumi",
    image: "/inicio/cat-amigurumi.jpg",
    imageAlt: "Ursinho de amigurumi em fio de algodão natural com cachecol terracota.",
  },
  {
    name: "Velas",
    image: "/inicio/cat-velas.jpg",
    imageAlt: "Vela aromática botânica em pote âmbar com ervas secas.",
  },
  {
    name: "Tapetes",
    image: "/inicio/cat-tapetes.jpg",
    imageAlt: "Tapete redondo de crochê em algodão cru com borda ondulada sobre piso de madeira clara.",
  },
  {
    name: "Home & Decor",
    image: "/inicio/cat-home-decor.jpg",
    imageAlt: "Peças de crochê e cestaria para decoração da casa.",
  },
  {
    name: "Kits Presente",
    image: "/inicio/cat-kits.jpg",
    imageAlt: "Caixa kraft de presente com velas botânicas e descanso de copo em crochê.",
  },
];

export const FEATURED_PRODUCTS: HomeProduct[] = [
  {
    id: "vela-ambar-canela-laranja",
    name: "Vela Âmbar Canela & Laranja Doce 150g",
    tagline: "Notas quentes, aconchego imediato",
    price: 79.9,
    rating: 5,
    reviewCount: 128,
    badge: "Mais Vendido",
    badgeTone: "primary",
    image: "/inicio/produto-vela.jpg",
    imageAlt: "Vela em pote de vidro âmbar com canela em pau e fatia de laranja.",
  },
  {
    id: "cachepo-terracota-nautico-m",
    name: "Cachepô Terracota Náutico M",
    tagline: "Fio lavável, estrutura firme",
    price: 64,
    rating: 4.5,
    reviewCount: 64,
    badge: "Feito à Mão",
    badgeTone: "secondary",
    image: "/inicio/produto-cachepo.jpg",
    imageAlt: "Cachepô de crochê náutico com uma suculenta sobre mesa de madeira.",
  },
  {
    id: "kit-trio-mini-velas-botanicas",
    name: "Kit Trio Mini Velas Botânicas",
    tagline: "Lavanda, Camomila & Alecrim",
    price: 94.9,
    rating: 5,
    reviewCount: 92,
    badge: "Edição Especial",
    badgeTone: "tertiary",
    image: "/inicio/produto-kit-velas.jpg",
    imageAlt: "Trio de mini velas botânicas em potes de porcelana dentro de caixa kraft com fita de juta.",
  },
  {
    id: "bolsa-tote-boho-algodao-cru",
    name: "Bolsa Tote Bag Boho Algodão Cru",
    tagline: "100% algodão, alça reforçada",
    price: 149,
    rating: 4,
    reviewCount: 45,
    badge: "Exclusiva",
    badgeTone: "primary-container",
    image: "/inicio/produto-tote.jpg",
    imageAlt: "Mulher sorrindo carregando uma bolsa tote de crochê cru em um café ensolarado.",
  },
];

export const TESTIMONIALS: HomeTestimonial[] = [
  {
    name: "Mariana Guimarães",
    location: "SP",
    quote:
      "A vela de canela e laranja tem um aroma tão reconfortante que virou o sinal oficial de fim do expediente no home office. O pavio de madeira estalando traz uma paz imensa!",
    purchase: "Vela Âmbar Canela & Laranja",
    avatar: "/inicio/depoimento-1.jpg",
    avatarAlt: "Retrato de Mariana Guimarães sorrindo em um apartamento aconchegante.",
  },
  {
    name: "Beatriz Nogueira",
    location: "PR",
    quote:
      "Os cachepôs em crochê são impecáveis. A trama é firme, a cor terracota é exata como nas fotos e a embalagem veio cheirando a alfazema com bilhetinho manuscrito. Dá pra sentir o amor.",
    purchase: "Conjunto Cachepô Náutico M & G",
    avatar: "/inicio/depoimento-2.jpg",
    avatarAlt: "Retrato de Beatriz Nogueira em uma casa de decoração escandinava.",
  },
  {
    name: "Lucas Mendes",
    location: "MG",
    quote:
      "Comprei o kit de presente para minha mãe e ela quase chorou de emoção. Desde a fita de algodão até o aroma delicado, foi a melhor experiência de compra artesanal que já tive online.",
    purchase: "Kit Trio Velas & Cesto de Fio Cru",
    avatar: "/inicio/depoimento-3.jpg",
    avatarAlt: "Retrato de Lucas Mendes com um suéter de lã segurando uma xícara.",
  },
];

export const FOOTER_NAVIGATION_LINKS = [
  { label: "Catálogo Completo", href: "/loja" },
  { label: "Sousplat, Bolsas e Amigurumi", href: "/loja" },
  { label: "Velas e Tapetes", href: "/loja" },
  { label: "Home & Decor", href: "/loja" },
  { label: "Kits Presente", href: "/loja" },
  { label: "A História do Ateliê", href: "/sobre" },
] as const;

export const FOOTER_CARE_LINKS = [
  "Cuidados com a Vela",
  "Prazos e Envio Sob Encomenda",
  "Cuidados com Peças de Crochê",
  "Trocas e Devoluções Éticas",
  "Perguntas Frequentes",
] as const;
