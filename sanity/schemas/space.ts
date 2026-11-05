import { defineType, defineField } from 'sanity'
export default defineType({ name: 'space', title: 'Space', type: 'document', fields: [
  defineField({ name: 'title', type: 'string', title: 'Name', validation: r => r.required() }),
  defineField({ name: 'label', type: 'string', title: 'Label shown on cards' }),
  defineField({ name: 'description', type: 'text', rows: 3 }),
  defineField({ name: 'order', type: 'number', title: 'Display order (lower first)' }),
  defineField({ name: 'archived', type: 'boolean', title: 'Archived (hide from filters)', initialValue: false })],
  orderings: [{ title: 'Order', name: 'o', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'label' } } })
