import { defineType, defineField } from 'sanity'
const isVideo = ({ document }: any) => document?.projectType !== 'script'
const isScript = ({ document }: any) => document?.projectType === 'script'
const rich = (name: string, title: string, hidden?: any) => defineField({ name, title, type: 'blockContent', hidden })
export default defineType({ name: 'project', title: 'Project', type: 'document', fields: [
  defineField({ name: 'projectType', title: 'Project type', type: 'string', initialValue: 'video', validation: r => r.required(),
    options: { list: [{ title: 'Video project', value: 'video' }, { title: 'Long-form script', value: 'script' }], layout: 'radio' } }),
  defineField({ name: 'title', type: 'string', validation: r => r.required() }),
  defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
  defineField({ name: 'space', type: 'reference', to: [{ type: 'space' }], validation: r => r.required() }),
  defineField({ name: 'reelUrl', title: 'Instagram Reel URL', type: 'url', hidden: ({ document }: any) => document?.projectType === 'script' }),
  defineField({ name: 'thumbnail', title: 'Thumbnail (9:16 recommended)', type: 'image', options: { hotspot: true }, hidden: ({ document }: any) => document?.projectType === 'script' }),
  defineField({ name: 'description', title: 'Short description', type: 'text', rows: 3, hidden: ({ document }: any) => document?.projectType === 'script' }),
  rich('idea', 'The idea', ({ document }: any) => document?.projectType === 'script'),
  rich('research', 'Research', ({ document }: any) => document?.projectType === 'script'),
  defineField({ name: 'sources', title: 'Research sources & links', type: 'array', hidden: ({ document }: any) => document?.projectType === 'script',
    of: [{ type: 'object', name: 'src', fields: [{ name: 'label', type: 'string' }, { name: 'url', type: 'url' }], preview: { select: { title: 'label', subtitle: 'url' } } }] }),
  rich('ideation', 'Ideation process', ({ document }: any) => document?.projectType === 'script'),
  rich('scripting', 'Scripting approach', ({ document }: any) => document?.projectType === 'script'),
  defineField({ name: 'metrics', title: 'Performance metrics (optional)', type: 'array', hidden: ({ document }: any) => document?.projectType === 'script',
    of: [{ type: 'object', name: 'metric', fields: [{ name: 'label', type: 'string' }, { name: 'value', type: 'string' }], preview: { select: { title: 'label', subtitle: 'value' } } }] }),
  defineField({ name: 'featured', title: 'Feature on homepage', type: 'boolean', initialValue: false, hidden: ({ document }: any) => document?.projectType === 'script' }),
  defineField({ name: 'synopsis', type: 'text', rows: 4, hidden: ({ document }: any) => document?.projectType !== 'script' }),
  rich('approach', 'Research & creative approach', ({ document }: any) => document?.projectType !== 'script'),
  defineField({ name: 'references', title: 'References (optional)', type: 'array', hidden: ({ document }: any) => document?.projectType !== 'script',
    of: [{ type: 'object', name: 'ref', fields: [{ name: 'label', type: 'string' }, { name: 'url', type: 'url' }], preview: { select: { title: 'label', subtitle: 'url' } } }] }),
  rich('script', 'Complete script'),
  defineField({ name: 'order', title: 'Display order (lower first)', type: 'number' })],
  orderings: [{ title: 'Display order', name: 'o', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', type: 'projectType', space: 'space.title', media: 'thumbnail' },
    prepare: ({ title, type, space, media }: any) => ({ title, subtitle: `${type === 'script' ? 'Script' : 'Video'} · ${space ?? 'no space'}`, media }) } })
