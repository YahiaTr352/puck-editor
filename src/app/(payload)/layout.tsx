import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import config from '@payload-config'
import React from 'react'
import { importMap } from './cms/importMap'
import DevOverlaySuppressor from '@/components/DevOverlaySuppressor'

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      htmlProps={{ suppressHydrationWarning: true }}
      serverFunction={async (args) => {
        'use server'
        return handleServerFunctions({ ...args, config, importMap })
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: 'nextjs-portal { display: none !important; }' }} />
      <DevOverlaySuppressor />
      {children}
    </RootLayout>
  )
}
