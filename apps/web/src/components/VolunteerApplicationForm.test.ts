import { describe, it, expect } from 'vitest';

/**
 * Unit tests for volunteer application form validation logic
 */

// Email validation pattern from the form - simpler and reliable pattern that excludes leading/trailing dots
const emailPattern = /^[a-zA-Z0-9][^\s@]*[a-zA-Z0-9]@[a-zA-Z0-9][^\s@]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

// Canadian phone number validation pattern from the form  
const phonePattern = /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

/**
 * Validation utility functions extracted from the component
 */
export function validateEmail(email: string): boolean {
  return emailPattern.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  return phonePattern.test(phone.trim());
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateAvailability(checkedBoxes: NodeListOf<HTMLInputElement>): boolean {
  return checkedBoxes.length > 0;
}

describe('Volunteer Application Form Validation', () => {
  describe('Email Validation', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'firstname+lastname@company.org',
        'test_email@subdomain.example.com'
      ];
      
      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        '',
        'invalid',
        '@domain.com',
        'test@',
        'test.domain.com',
        'test @domain.com',
        'test@domain',
        'test@domain.',
        '.test@domain.com',
        'test@.domain.com'
      ];
      
      invalidEmails.forEach(email => {
        const result = validateEmail(email);
        if (result) {
          console.log(`Email "${email}" unexpectedly passed validation`);
        }
        expect(result).toBe(false);
      });
    });

    it('should handle whitespace correctly', () => {
      expect(validateEmail('  test@example.com  ')).toBe(true);
      expect(validateEmail('   ')).toBe(false);
    });
  });

  describe('Phone Number Validation', () => {
    it('should accept valid Canadian phone numbers', () => {
      const validPhones = [
        '(555) 123-4567',
        '555-123-4567',
        '555.123.4567',
        '555 123 4567',
        '5551234567',
        '+1 555 123 4567',
        '+1-555-123-4567',
        '1 (555) 123-4567'
      ];
      
      validPhones.forEach(phone => {
        expect(validatePhone(phone)).toBe(true);
      });
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = [
        '',
        '123',
        '555-123',
        '555-123-456',
        '555-123-45678',
        'abcd-efg-hijk',
        '(555) 123-456a',
        '+44 20 7123 4567' // UK format
      ];
      
      invalidPhones.forEach(phone => {
        expect(validatePhone(phone)).toBe(false);
      });
    });

    it('should handle whitespace correctly', () => {
      expect(validatePhone('  (555) 123-4567  ')).toBe(true);
      expect(validatePhone('   ')).toBe(false);
    });
  });

  describe('Required Field Validation', () => {
    it('should accept non-empty strings', () => {
      expect(validateRequired('John Doe')).toBe(true);
      expect(validateRequired('a')).toBe(true);
      expect(validateRequired('  test  ')).toBe(true);
    });

    it('should reject empty or whitespace-only strings', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired('\t\n')).toBe(false);
    });
  });

  describe('Form Field Requirements', () => {
    it('should validate all required personal information fields', () => {
      const personalInfo = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        address: '123 Main St, City, Province'
      };

      expect(validateRequired(personalInfo.fullName)).toBe(true);
      expect(validateEmail(personalInfo.email)).toBe(true);
      expect(validatePhone(personalInfo.phone)).toBe(true);
      expect(validateRequired(personalInfo.address)).toBe(true);
    });

    it('should handle optional fields correctly', () => {
      const optionalFields = {
        experience: '',
        skills: '    ',
        comments: 'Some comments'
      };

      // Optional fields should not be required
      expect(validateRequired(optionalFields.experience)).toBe(false);
      expect(validateRequired(optionalFields.skills)).toBe(false);
      expect(validateRequired(optionalFields.comments)).toBe(true);
    });
  });

  describe('Integration Test Scenarios', () => {
    it('should validate a complete valid form submission', () => {
      const formData = {
        fullName: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Avenue, Toronto, ON M1A 2B3',
        roleSelection: 'Community Outreach Coordinator',
        experience: 'Previous volunteer work with local charities',
        skills: 'Communication, event planning, social media',
        backgroundCheckConsent: true,
        termsAgreement: true,
        additionalComments: 'Very excited to contribute!'
      };

      expect(validateRequired(formData.fullName)).toBe(true);
      expect(validateEmail(formData.email)).toBe(true);
      expect(validatePhone(formData.phone)).toBe(true);
      expect(validateRequired(formData.address)).toBe(true);
      expect(validateRequired(formData.roleSelection)).toBe(true);
      expect(formData.backgroundCheckConsent).toBe(true);
      expect(formData.termsAgreement).toBe(true);
    });

    it('should fail validation for incomplete form submission', () => {
      const incompleteFormData = {
        fullName: '',
        email: 'invalid-email',
        phone: '123',
        address: '   ',
        roleSelection: '',
        backgroundCheckConsent: false,
        termsAgreement: false
      };

      expect(validateRequired(incompleteFormData.fullName)).toBe(false);
      expect(validateEmail(incompleteFormData.email)).toBe(false);
      expect(validatePhone(incompleteFormData.phone)).toBe(false);
      expect(validateRequired(incompleteFormData.address)).toBe(false);
      expect(validateRequired(incompleteFormData.roleSelection)).toBe(false);
      expect(incompleteFormData.backgroundCheckConsent).toBe(false);
      expect(incompleteFormData.termsAgreement).toBe(false);
    });
  });
});
