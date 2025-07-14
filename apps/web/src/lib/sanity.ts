import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityTest, SanityConnectionTest, SupportedLanguage, StaticPage, BlogPost, Author } from '@colourfully-digital/types/sanity'

// Environment variables for Sanity configuration
const projectId = import.meta.env.SANITY_PROJECT_ID || 'ir1my444'
const dataset = import.meta.env.SANITY_DATASET || 'production'
const apiVersion = import.meta.env.SANITY_API_VERSION || '2023-05-03'
const token = import.meta.env.SANITY_TOKEN || ''

// Create Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster response times
  token, // Optional: for authenticated requests
})

// Image URL builder for Sanity images
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to test the connection with language support
export async function testConnection(language: SupportedLanguage = 'en'): Promise<SanityConnectionTest> {
  try {
    const result = await client.fetch<SanityTest>('*[_type == "sanityTest" && language == $language][0]', { language })
    return { success: true, data: result }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred while connecting to Sanity'
    }
  }
}

// Helper function to fetch all test documents with language filtering
export async function getAllTestDocuments(language?: SupportedLanguage): Promise<SanityTest[]> {
  try {
    let query = '*[_type == "sanityTest"'
    let params = {}
    
    if (language) {
      query += ' && language == $language'
      params = { language }
    }
    
    query += '] | order(_createdAt desc)'
    
    const result = await client.fetch<SanityTest[]>(query, params)
    return result || []
  } catch (error) {
    console.error('Error fetching test documents:', error)
    return []
  }
}

// Helper function to get localized content by type
export async function getLocalizedContent<T>(
  documentType: string, 
  language: SupportedLanguage,
  additionalFilters?: string
): Promise<T[]> {
  try {
    let query = `*[_type == "${documentType}" && language == $language`
    
    if (additionalFilters) {
      query += ` && ${additionalFilters}`
    }
    
    query += '] | order(_createdAt desc)'
    
    const result = await client.fetch<T[]>(query, { language })
    return result || []
  } catch (error) {
    console.error(`Error fetching ${documentType} documents:`, error)
    return []
  }
}

// Helper function to get a single localized document
export async function getLocalizedDocument<T>(
  documentType: string,
  language: SupportedLanguage,
  slug?: string,
  additionalFilters?: string
): Promise<T | null> {
  try {
    let query = `*[_type == "${documentType}" && language == $language`
    let params: any = { language }
    
    if (slug) {
      query += ' && slug.current == $slug'
      params.slug = slug
    }
    
    if (additionalFilters) {
      query += ` && ${additionalFilters}`
    }
    
    query += '][0]'
    
    const result = await client.fetch<T>(query, params)
    return result || null
  } catch (error) {
    console.error(`Error fetching ${documentType} document:`, error)
    return null
  }
}

// Helper function to fetch static page by slug
export async function getStaticPage(slug: string, language: SupportedLanguage): Promise<StaticPage | null> {
  return getLocalizedDocument<StaticPage>('staticPage', language, slug)
}

// Helper function to fetch all static pages for a language
export async function getAllStaticPages(language: SupportedLanguage): Promise<StaticPage[]> {
  return getLocalizedContent<StaticPage>('staticPage', language)
}

// Helper function to fetch blog posts with author info and pagination
export async function getBlogPosts(
  language: SupportedLanguage, 
  limit: number = 10, 
  offset: number = 0
): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "blogPost" && language == $language] | order(publishedAt desc) [$offset...$end] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      publishedAt,
      mainImage,
      body,
      language,
      translation,
      author->{
        _id,
        name,
        picture
      }
    }`
    
    const params = { 
      language, 
      offset, 
      end: offset + limit - 1 
    }
    
    const result = await client.fetch<BlogPost[]>(query, params)
    return result || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Helper function to get total count of blog posts for pagination
export async function getBlogPostCount(language: SupportedLanguage): Promise<number> {
  try {
    const query = `count(*[_type == "blogPost" && language == $language])`
    const result = await client.fetch<number>(query, { language })
    return result || 0
  } catch (error) {
    console.error('Error getting blog post count:', error)
    return 0
  }
}

// Helper function to fetch a single blog post by slug
export async function getBlogPost(slug: string, language: SupportedLanguage): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug && language == $language][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      publishedAt,
      mainImage,
      body,
      language,
      translation,
      author->{
        _id,
        name,
        picture
      }
    }`
    
    const result = await client.fetch<BlogPost>(query, { slug, language })
    return result || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// Helper function to fetch all authors
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const query = `*[_type == "author"] | order(name asc)`
    const result = await client.fetch<Author[]>(query)
    return result || []
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}
