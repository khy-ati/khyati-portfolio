import { defineType, defineField } from 'sanity'

const fonts = [
  { title: 'Neue Haas Grotesk', value: 'neue' },
  { title: 'Inter (free, clean sans)', value: 'inter' },
  { title: 'Hanken Grotesk (free, grotesk)', value: 'hanken' },
  { title: 'Instrument Sans (free, modern sans)', value: 'instrument' },
]

export default defineType({
  name: 'siteSettings', title: 'Site settings', type: 'document', fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'headline', type: 'text', rows: 3, title: 'Homepage headline / tagline' }),
    defineField({ name: 'intro', type: 'text', rows: 4, title: 'Short introduction' }),
    defineField({ name: 'heroImage', type: 'image', title: 'Homepage background image (optional)', options: { hotspot: true } }),
    defineField({ name: 'headingFont', title: 'Heading font', type: 'string', options: { list: fonts }, initialValue: 'neue' }),
    defineField({ name: 'bodyFont', title: 'Body font', type: 'string', options: { list: fonts }, initialValue: 'neue' }),
    defineField({ name: 'email', type: 'string', title: 'Email address' }),
    defineField({
      name: 'links', title: 'Menu / external links', type: 'array', of: [{
        type: 'object', name: 'link',
        fields: [{ name: 'label', type: 'string', title: 'Label (e.g. Instagram)' }, { name: 'url', type: 'url', title: 'URL', validation: r => r.uri({ scheme: ['http', 'https', 'mailto'] }) }],
        preview: { select: { title: 'label', subtitle: 'url' } }
      }]
    })]
})