import { defineType, defineField } from 'sanity'
export default defineType({ name: 'siteSettings', title: 'Site settings', type: 'document', fields: [
  defineField({ name: 'name', type: 'string', title: 'Name' }),
  defineField({ name: 'headline', type: 'text', rows: 3, title: 'Homepage headline / tagline' }),
  defineField({ name: 'intro', type: 'text', rows: 4, title: 'Short introduction' }),
  defineField({ name: 'email', type: 'string', title: 'Email address' }),
  defineField({ name: 'links', title: 'Menu / external links', type: 'array', of: [{ type: 'object', name: 'link',
    fields: [{ name: 'label', type: 'string', title: 'Label (e.g. Instagram)' }, { name: 'url', type: 'url', title: 'URL', validation: r => r.uri({ scheme: ['http', 'https', 'mailto'] }) }],
    preview: { select: { title: 'label', subtitle: 'url' } } }] })] })
