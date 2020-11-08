export default {
  name: 'template',
  title: 'Template',
  type: 'document',
  fields: [
    {
      type: 'string',
      title: 'Template Name',
      name: 'name',
    },
    {
      type: 'array',
      title: 'Sections',
      name:'sections',
      of: [{
        type: 'reference',
          to: [{ type: 'section' }],
      }],
      validation: (Rule) => Rule.min(1),

    },
  ],
};
