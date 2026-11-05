'use client'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { projectId, dataset, apiVersion } from './sanity/env'
import blockContent from './sanity/schemas/blockContent'
import siteSettings from './sanity/schemas/siteSettings'
import space from './sanity/schemas/space'
import project from './sanity/schemas/project'

export default defineConfig({
  basePath: '/admin', projectId, dataset, title: 'Khyati — Admin',
  schema: { types: [siteSettings, space, project, blockContent],
    templates: t => t.filter(x => x.schemaType !== 'siteSettings') },
  document: { actions: (prev, ctx) => ctx.schemaType === 'siteSettings' ? prev.filter(a => !['unpublish', 'delete', 'duplicate'].includes(a.action || '')) : prev },
  plugins: [structureTool({ structure: S => S.list().title('Content').items([
    S.listItem().title('Site settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    S.divider(),
    S.documentTypeListItem('space').title('Spaces'),
    S.documentTypeListItem('project').title('Projects')]) }),
    visionTool({ defaultApiVersion: apiVersion })] })
