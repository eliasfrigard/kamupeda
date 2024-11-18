import { createClient } from 'contentful-management';

const managementAccessToken = process.env.MANAGEMENT_ACCESS_TOKEN || 'CFPAT-19q3uNnnCedAhrDpd3v8OFFTwSiLmUB9-dOgxE4rVu8';

export const getContentType = async (contentType: string) => {
  const client = createClient({
    accessToken: managementAccessToken,
  });

  // Fetch the space and environment
  const space = await client.getSpace(process.env.SPACE_ID || 'nqeymplwbzvw')
  const environment = await space.getEnvironment('master')

  // Get the content type definition
  const contentTypeDefinition = await environment.getContentType(contentType)

  return contentTypeDefinition
}
