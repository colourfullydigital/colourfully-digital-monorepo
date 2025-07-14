import {defineField, defineType} from 'sanity'

export const staticPageType = defineType({
  name: 'staticPage',
  title: 'Static Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'pageTitle',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'French', value: 'fr'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'en',
    }),
    defineField({
      name: 'translation',
      title: 'Translation',
      type: 'reference',
      to: [{type: 'staticPage'}],
      description: 'Reference to the translated version of this page',
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
      language: 'language',
      slug: 'slug.current',
    },
    prepare({title, language, slug}) {
      return {
        title: `${title} (${language?.toUpperCase()})`,
        subtitle: slug ? `/${slug}` : 'No slug',
      }
    },
  },
  orderings: [
    {
      title: 'Page Title, A to Z',
      name: 'pageTitleAsc',
      by: [{field: 'pageTitle', direction: 'asc'}],
    },
    {
      title: 'Language',
      name: 'languageAsc',
      by: [{field: 'language', direction: 'asc'}],
    },
  ],
})
