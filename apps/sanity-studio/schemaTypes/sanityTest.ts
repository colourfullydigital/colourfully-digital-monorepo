import {defineType, defineField} from 'sanity'

export const sanityTestType = defineType({
  name: 'sanityTest',
  title: 'Sanity Test',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      description: 'A test message to verify the connection',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Français', value: 'fr' }
        ]
      },
      initialValue: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'message',
      language: 'language',
    },
    prepare(selection) {
      const { title, subtitle, language } = selection
      return {
        title: `${title} (${language?.toUpperCase()})`,
        subtitle: subtitle,
      }
    },
  },
})
