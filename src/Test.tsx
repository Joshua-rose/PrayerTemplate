import React, { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import SanityClient from './client';
import Guide from './components/guide';
interface overrideType {
    [key: string] : any;
}
// export default function Test() {
//   const sectionPlaceHolder: overrideType[] = [];
//   const [sections, setSections] = useState(sectionPlaceHolder);
//   useEffect(() => {
//     SanityClient.fetch(
//       `*[name == $name && defined(sections)]
// {
// name,
// "sections": sections[]->
// }`,
//       { name: 'Default Template' },
//     ).then((data) => {
//       console.log(data);
//       setSections(data[0].sections);
//     }).catch((data) => {
//       console.log(': ------------------');
//       console.log('Test Error -> data', data);
//       console.log(': ------------------');
//     });
//   }, []);
//   const serializers = {
//   types: {
//     scriptureReference: (props:any) => {
//         const {ref, ref_body:body} = props.node
//         return (
//         <details>
//             <summary>
//                 {ref}
//             </summary>
//                 <BlockContent
//                     blocks={body}
//                     projectId={SanityClient.config().projectId}
//                     dataset={SanityClient.config().dataset}
//                 />
//             </details>
//     )}
//   }
// }
//   if (!sections) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <>
//       {sections && sections.map((section) => (
//         <BlockContent
//           blocks={section.richText}
//           projectId={SanityClient.config().projectId}
//           dataset={SanityClient.config().dataset}
//           serializers={serializers}
//         />
//       ))}
//     </>
//   );
// }
export default function Test() {
  return (
    <Guide template="Default Template" />
  )
}