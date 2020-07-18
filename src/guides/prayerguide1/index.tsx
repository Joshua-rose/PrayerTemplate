import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

const Praise = require('./Praise-Give_God_Glory.md');
const Confess = require('./Confess-Temple_cleansing_time.md');

export type plan = {
    time: string,
    title: string,
    content: ()=>Promise<JSX.Element>,
    display?: any,
}
async function getMarkdown(fileName: string) {
  return fetch(fileName).then((response) => response.text());
}
const prayerPlan: plan[] = [
  {
    time: '05:00',
    title: 'Praise - Give God Glory',
    content: async () => {
      const content = await getMarkdown(Praise);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
  {
    time: '05:00',
    title: 'Confession - Temple Cleansing Time',
    content: async () => {
      const content = await getMarkdown(Confess);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
];
export default prayerPlan;
