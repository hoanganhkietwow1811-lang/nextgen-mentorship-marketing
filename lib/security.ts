// Security utilities for input validation, sanitization, and file handling
import { z } from 'zod';
import path from 'path';

// Input validation schemas
export const postSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  content: z.string().min(1).max(50000).trim(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export const loginSchema = z.object({
  email: z.string().email().max(255).toLowerCase().trim(),
  password: z.string().min(1).max(128), // Minimum 1 char for now (can be increased after migration)
});

// Sanitize filename to prevent path traversal and other attacks
export function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
  const sanitized = filename
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace non-alphanumeric (except . _ -) with _
    .replace(/\.\./g, '') // Remove path traversal attempts
    .replace(/^\.+/, '') // Remove leading dots
    .substring(0, 255); // Limit length
  
  // Ensure it's not empty
  if (!sanitized || sanitized.trim() === '') {
    return `file_${Date.now()}`;
  }
  
  return sanitized;
}

// Validate file type by checking MIME type and extension
export function isValidImageFile(file: File): boolean {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  // Check MIME type
  if (!allowedMimeTypes.includes(file.type)) {
    return false;
  }
  
  // Check file extension
  const ext = path.extname(file.name).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return false;
  }
  
  return true;
}

// Maximum file size: 5MB (in bytes)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Sanitize HTML content to prevent XSS
export function sanitizeHtml(html: string): string {
  // Basic XSS prevention - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:text\/html/gi, ''); // Remove data URIs
}

// Validate URL to prevent SSRF
export function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    // Only allow HTTPS
    if (parsedUrl.protocol !== 'https:') {
      return false;
    }
    
    // Allow specific trusted domains
    const allowedDomains = [
      'images.unsplash.com',
      'cdninstagram.com',
      'fbcdn.net',
    ];
    
    const hostname = parsedUrl.hostname.toLowerCase();
    return allowedDomains.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}
