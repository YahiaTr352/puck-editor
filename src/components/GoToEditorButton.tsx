'use client'

import React from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

export default function GoToEditorButton() {
  const { collectionSlug, id } = useDocumentInfo()
  
  // Retrieve the value of the 'slug' field from the form state
  const slugField = useFormFields(([fields]) => fields.slug)
  const slug = slugField?.value as string | undefined

  console.log('GoToEditorButton debug:', { collectionSlug, id, slug })

  // If the document hasn't been saved yet (no ID), do not show the button
  if (!id) {
    return null
  }

  // Determine the correct Puck Editor path based on the collection and slug
  // ONLY show the button for the landing/homepage (slug: 'home' or 'homehome') in the pages collection
  let editorUrl = ''
  if (collectionSlug === 'pages' && (slug === 'home' || slug === 'homehome' || slug === '/' || slug === '' || id === '1' || id === 1)) {
    editorUrl = '/admin/home'
  }

  if (!editorUrl) {
    return null
  }

  return (
    <div style={{ marginBottom: '20px', marginTop: '10px' }}>
      <a
        href={editorUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          color: '#ffffff',
          textDecoration: 'none',
          fontWeight: 800,
          fontSize: '14px',
          padding: '12px 24px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#222222'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#000000'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        <span>الذهاب إلى المحرر البصري</span>
      </a>
    </div>
  )
}
