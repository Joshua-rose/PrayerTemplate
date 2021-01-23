/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, ReactElement } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import SanityClient from '../client';
import Section from './section';
import { MinSec, Timer } from '../utils/timerHelpers';

interface Props {
    template: string;
}
const chimeSource = require('../assets/352661__foolboymedia__complete-chime.mp3');

const chime = new Audio();

export default function Guide({ template }: Props): ReactElement {
  const [sections, setSections] = useState([] as any[]);
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(null as any);
  const [activeSection, setActiveSection] = useState(-1);
  // let activeSection: number;
  const getCurrentActiveSection = () => {
    const localActiveSection = activeSection;
    return localActiveSection;
  };
  // const setActiveSection = (newValue: number) => { activeSection = newValue; };
  useEffect(() => {
    const currentSection = sections.findIndex((sec) => sec.isFocused);

    if (currentSection !== -1 && activeSection !== currentSection) {
      setActiveSection(currentSection);
    }
  }, [sections]);
  const goToNext = () => {
    // const currentKey = getActiveSection();
    setSections((prevSections) => prevSections.map((sec, i) => {
      if (i === activeSection) {
        return {
          ...sec,
          isTimerRunning: false,
          isFocused: false,
          timeRemaining: timer.togglePause(),
        };
      } if (i === activeSection + 1) {
        setActiveSection(i);
        return {
          ...sec,
          isTimerRunning: false,
          isFocused: true,
        };
      } return sec;
    }));
  };
  const endOfTimer = () => {
    chime.play();
    setShowModal(true);
    // const index = getActiveSection();
    setSections((prevSections) => prevSections.map((s, i) => {
      if (i === activeSection) {
        return {
          ...s,
          isTimerRunning: false,
          isComplete: true,
        };
      }
      return s;
    }));
    // create modal content with buttons for going to next or clearing modal
  };

  const intervalCallback = (timeRemaining:MinSec) => {
    // const localActiveSection = getCurrentActiveSection();
    setSections((prevSections) => prevSections.map((s, i) => {
      if (s.isFocused) {
        return {
          ...s,
          timeRemaining,
        };
      }
      return s;
    }));
    // const holdStatus = { ...sectionStatus };
    // const key = getActiveSection();
    // holdStatus[key].timeRemaining = timeRemaining;
    // setSectionStatus(holdStatus);
  };
  // const timer = new Timer({
  //   endOfTimeCallback: endOfTimer,
  //   intervalCallback,
  // });
  const togglePause = () => {
    // const index = getActiveSection();
    if (sections[activeSection].isTimerRunning) {
      setSections((prevSections) => prevSections.map((sec, i) => {
        if (i === activeSection) {
          const timeRemaining = timer.togglePause();

          return {
            ...sec,
            isTimerRunning: false,
            timeRemaining,
          };
        }
        return sec;
      }));
    } else {
      let timeRemaining;
      setSections((prevSections) => prevSections.map((sec, i) => {
        if (i === activeSection) {
          ({ timeRemaining } = sec);
          if (timeRemaining) timer.startTimer(timeRemaining);
          return {
            ...sec,
            isTimerRunning: true,
          };
        }
        return sec;
      }));
    }
  };
  const headerClickHandler = (key: string) => {
    const keyIndex = sections.findIndex((sec) => sec.key === key);
    // const currentKey = getActiveSection();
    if (keyIndex === activeSection) {
      // hi
      togglePause();
    } else {
      setSections((prevSections) => prevSections.map((s, i) => {
        if (i === keyIndex) {
          setActiveSection(i);
          return {
            ...s,
            isFocused: true,
          };
        } if (i === activeSection) {
          return {
            ...s,
            isTimerRunning: false,
            isFocused: false,
          };
        }
        return s;
      }));

      // const holdStatus = { ...sectionStatus };
      // holdStatus[currentKey].isFocused = false;
      // holdStatus[key].isFocued = true;
      // timer.startTimer(holdStatus[key].timeRemaining);
      // setSectionStatus(holdStatus);
    }
  };
  useEffect(() => {
    SanityClient.fetch(
      `*[name == $name && defined(sections)]
{
name,
"sections": sections[]->
}`,
      { name: template },
    ).then((data) => {
      setSections(data[0].sections.map((s:any, i:number) =>

      // const sec = data[0].sections[s];

        ({
          ...s,
          isTimerRunning: false,
          isComplete: false,
          isFocused: false,
          timeRemaining: { min: parseInt(s.time, 10), sec: 0 },
          key: `${s._id}${i}`,
        })));
      setTimer((oldTimer: any) => (oldTimer === null
        ? new Timer({
          endOfTimeCallback: endOfTimer,
          intervalCallback,
        }) : oldTimer));
    }).catch((data) => {
      console.log('Error getting data from CMS');
    });
  }, []);

  if (!sections) {
    return <div>Loading...</div>;
  }
  const block = (p:any) => {
    console.log('🚀 ------------------------------------------------------');
    console.log('🚀 ~ file: guide.tsx ~ line 186 ~ block ~ props', p);
    console.log('🚀 ------------------------------------------------------');
    const { node, children } = p;
    console.log('🚀 ------------------------------------------------------------');
    console.log('🚀 ~ file: guide.tsx ~ line 190 ~ block ~ children', children);
    console.log('🚀 ------------------------------------------------------------');
    const { style } = node;
    switch (style) {
      case 'h2':
        return (<h2>{Array.isArray(children) ? children.map((child) => (typeof child === 'string' ? child.replace('&nbsp;', ' ') : child)) : children}</h2>);
      default:
        return (<p>{Array.isArray(children) ? children.map((child) => (typeof child === 'string' ? child.replace(/\s/g, ' ') : child)) : children}</p>);
    }
    if (typeof style === 'undefined' || style === 'normal') {
      console.log('returning p');
    }

    const MyTag = style;
    return (<MyTag>{children}</MyTag>);
  };
  return (
    <>
      {sections.length > 0 && !!timer && sections.map(({
        title, key, isFocused, timeRemaining, isTimerRunning, richText,
      }, index) => (
        <Section
          title={title}
          index={key}
          key={key}
          isFocused={isFocused}
          togglePlaying={togglePause}
          headerClickHandler={headerClickHandler}
          proceedToNextSection={goToNext}
          time={`${timeRemaining.min}:${timeRemaining.sec}`}
          resetTimer={timer.resetTimer}
          isTimerRunning={isTimerRunning}
        >
          <BlockContent
            blocks={richText}
            projectId={SanityClient.config().projectId}
            dataset={SanityClient.config().dataset}
            renderContainerOnSingleChild
            serializers={{
              types: {
                scriptureReference: (props:any) => {
                  const { node } = props;
                  const { ref, ref_body: body } = node;
                  return (
                    <details>
                      <summary>
                        {ref}
                      </summary>
                      <BlockContent
                        blocks={body}
                        projectId={SanityClient.config().projectId}
                        dataset={SanityClient.config().dataset}
                        serializers={{ 
                          types: { block } 
                        }}
                      />
                    </details>
                  );
                },
                block,
              },
            }}
          />
        </Section>
      ))}
    </>
  );
}
