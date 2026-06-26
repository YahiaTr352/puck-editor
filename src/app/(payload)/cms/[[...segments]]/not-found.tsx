import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments?: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params: params as any, searchParams: searchParams as any })

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, params: params as any, searchParams: searchParams as any, importMap })

export default NotFound
