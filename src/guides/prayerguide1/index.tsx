import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

const Praise = require('./Praise-Give_God_Glory.md');
const Confess = require('./Confess-Temple_cleansing_time.md');
const Intercession = require('./Intercession-Remember_the_world.md');
const CommingSoon = require('./Comming Soon.md');

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
  {
    time: '05:00',
    title: 'Intercession - Remember the world',
    content: async () => {
      const content = await getMarkdown(Intercession);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
  {
    time: '05:00',
    title: 'Petition - Share my needs',
    content: async () => {
      const content = await getMarkdown(CommingSoon);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
  {
    time: '05:00',
    title: 'Thanksgiving - Give Specific thanks',
    content: async () => {
      const content = await getMarkdown(CommingSoon);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
  {
    time: '05:00',
    title: 'Meditation - Ponder Spiritual things',
    content: async () => {
      const content = await getMarkdown(CommingSoon);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
  {
    time: '05:00',
    title: 'Listening - Let God speak',
    content: async () => {
      const content = await getMarkdown(CommingSoon);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
  {
    time: '05:00',
    title: 'Word - Read the word',
    content: async () => {
      const content = await getMarkdown(CommingSoon);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
  {
    time: '05:00',
    title: 'Read Bible material',
    content: async () => {
      const content = await getMarkdown(CommingSoon);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
  {
    time: '05:00',
    title: 'Praise - Give God Glory',
    content: async () => {
      const content = await getMarkdown(Praise);
      return (<ReactMarkdown source={content} escapeHtml={false} />);
    },
  },
];
export default prayerPlan;
