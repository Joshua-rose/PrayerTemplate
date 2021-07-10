export default {
    name: 'scriptureReference',
    type: 'document',
    fields: [
        {
            name: 'ref',
            type: 'string',
        },
        {
            name: 'ref_body',
            type: 'array',
            of: [{type: 'block'}]
        }
    ]
}