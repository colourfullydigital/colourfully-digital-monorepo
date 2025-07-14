import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'volunteerRole',
  title: 'Volunteer Role',
  type: 'document',
  fields: [
    defineField({
      name: 'roleTitle',
      title: 'Role Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(1000)
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.min(1).max(10)
    }),
    defineField({
      name: 'timeCommitment',
      title: 'Time Commitment',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(200)
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to enable/disable this volunteer role listing'
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'French', value: 'fr'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'translation',
      title: 'Translation',
      type: 'reference',
      to: [{type: 'volunteerRole'}],
      description: 'Link to the translation of this volunteer role'
    })
  ],
  preview: {
    select: {
      title: 'roleTitle',
      language: 'language',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, language, isActive} = selection
      return {
        title: title,
        subtitle: `${language.toUpperCase()} ${isActive ? '(Active)' : '(Inactive)'}`
      }
    }
  },
  orderings: [
    {
      title: 'Role Title A-Z',
      name: 'roleTitleAsc',
      by: [
        {field: 'roleTitle', direction: 'asc'}
      ]
    },
    {
      title: 'Language',
      name: 'languageAsc',
      by: [
        {field: 'language', direction: 'asc'},
        {field: 'roleTitle', direction: 'asc'}
      ]
    }
  ]
})
