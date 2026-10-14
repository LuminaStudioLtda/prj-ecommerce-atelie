export type HomeProductTone = "primary" | "secondary" | "tertiary" | "primary-container";

export type HomeProduct = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge: string;
  badgeTone: HomeProductTone;
  image: string;
  imageAlt: string;
};

export type HomeCategory = {
  name: string;
  image?: string;
  imageAlt?: string;
};

export type HomeTestimonial = {
  name: string;
  location: string;
  quote: string;
  purchase: string;
  avatar: string;
  avatarAlt: string;
};

export type HomeValueProposition = {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
};

export type StarState = "full" | "half" | "empty";
