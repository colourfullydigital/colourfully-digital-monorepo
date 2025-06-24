// Common form types based on coding standards
export interface VolunteerApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interests: string[];
  experience: string;
  availability: string;
  referralSource?: string;
}

export interface NewsletterSubscriptionPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  language: 'en' | 'fr';
}

// Content types for Sanity.io integration
export interface SanityImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Program {
  _id: string;
  _type: 'program';
  title: string;
  description: string;
  image?: SanityImageAsset;
  category: string;
  status: 'active' | 'inactive' | 'upcoming';
  registrationUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any; // Sanity block content
  image?: SanityImageAsset;
  publishedAt: string;
  author: string;
  tags: string[];
}

// Form validation types
export type FormValidationState = 'idle' | 'validating' | 'valid' | 'invalid';

export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormState {
  status: FormValidationState;
  errors: FormFieldError[];
  isSubmitting: boolean;
}
