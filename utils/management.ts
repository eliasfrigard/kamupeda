import { createClient } from 'contentful-management';

const managementAccessToken = process.env.MANAGEMENT_ACCESS_TOKEN || '';

export const getContentType = async (contentType: string) => {
  const client = createClient({
    accessToken: managementAccessToken,
  });

  // Fetch the space and environment
  const space = await client.getSpace(process.env.SPACE_ID || '')
  const environment = await space.getEnvironment('master')

  // Get the content type definition
  const contentTypeDefinition = await environment.getContentType(contentType)

  return contentTypeDefinition
}
