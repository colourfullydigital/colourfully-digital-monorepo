import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityTest, SanityConnectionTest } from '@colourfully-digital/types/sanity'

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

// Helper function to test the connection
export async function testConnection(): Promise<SanityConnectionTest> {
  try {
    const result = await client.fetch<SanityTest>('*[_type == "sanityTest"][0]')
    return { success: true, data: result }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred while connecting to Sanity'
    }
  }
}

// Helper function to fetch all test documents with error handling
export async function getAllTestDocuments(): Promise<SanityTest[]> {
  try {
    const result = await client.fetch<SanityTest[]>('*[_type == "sanityTest"] | order(_createdAt desc)')
    return result || []
  } catch (error) {
    console.error('Error fetching test documents:', error)
    return []
  }
}
