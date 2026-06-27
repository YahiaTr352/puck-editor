import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import React from 'react'
import { importMap } from './cms/importMap'

import '@payloadcms/next/css'

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
      {children}
    </RootLayout>
  )
}
