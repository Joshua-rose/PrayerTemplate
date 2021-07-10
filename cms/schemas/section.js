export default {
    name: 'section',
    title: 'Section',
    type: 'document',
    fields: [
        {
            title:'Title',
            name: 'title',
            type: 'string'
        },
        {
            title:'Time (in minutes)',
            name: 'time',
            type: 'string'
        },
        {
            title: 'body',
            type: 'richText',
            name: 'richText'
        }
    ]
}