import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: 'oofyj5oo',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
})