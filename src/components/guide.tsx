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
  // const [sectionStatus, setSectionStatus] = useState({} as any);
  const [showModal, setShowModal] = useState(false);
  const getActiveSection = () => sections.findIndex((sec) => sec.isFocused)
  // let index: number = -1;
  // for (let ind = 0; ind < sections.length; ind++) {
  //   if (sections[ind].isFocused) {
  //     index = ind;
  //     break;
  //   }
  // }
  // // const [key] = Object.keys(sectionStatus).filter((s) => sections[s].isFocused);
  // return index;
  // ;

  const goToNext = () => {
    const currentKey = getActiveSection();
    setSections(sections.map((sec, i) => {
      if (i === currentKey) {
        return {
          ...sec,
          isTimerRunning: false,
          isFocused: false,
        };
      } if (i === currentKey + 1) {
        return {
          ...sec,
          // isTimerRunning: false,
          isFocused: true,
        };
      } return sec;
    }));
  };
  const endOfTimer = () => {
    chime.play();
    setShowModal(true);
    const index = getActiveSection();
    setSections(sections.map((s, i) => {
      if (i === index) {
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
    const index = getActiveSection();
    setSections(sections.map((s, i) => {
      if (i === index) {
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
  const timer = new Timer({
    endOfTimeCallback: endOfTimer,
    intervalCallback,
  });
  const togglePause = () => {
    const index = getActiveSection();
    if (sections[index].isTimerRunning) {
      setSections(sections.map((sec, i) => {
        if (i === index) {
          const timeRemaining = timer.togglePause();
          return {
            ...sec,
            isTimerRunning: false,
            timeRemaining,
          };
        }
      }));
    } else {
      setSections(sections.map((sec, i) => {
        if (i === index) {
          chime.src = '';
          chime.play();
          chime.src = chimeSource;
          timer.startTimer(sec.timeRemaining);
          return {
            ...sec,
            isTimerRunning: true,
          };
        }
      }));
    }
  };
  const headerClickHandler = (key: string) => {
    const keyIndex = sections.findIndex((sec) => sec.key === key);
    // sections.forEach(callbackfn);
    const currentKey = getActiveSection();
    if (keyIndex === currentKey) togglePause();
    else {
      setSections(sections.map((s, i) => {
        if (i === keyIndex) {
          return {
            ...s,
            isTimerRunning: false,
            isFocused: false,
          };
        } if (i === currentKey) {
          return {
            ...s,
            isFocused: true,
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
      setSections(data[0].sections.map((s:any, i:number) => {
        // const sec = data[0].sections[s];
        return {
          ...s,
          isTimerRunning: false,
          isComplete: false,
          isFocused: false,
          timeRemaining: s.time,
          key: `${s._id}${i}`,
        };
      }));
    }).catch((data) => {
      console.log(': ------------------');
      console.log('Test Error -> data', data);
      console.log(': ------------------');
    });
  }, []);

  if (!sections) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {sections.map(({
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
          time={timeRemaining}
          resetTimer={timer.resetTimer}
          isTimerRunning={isTimerRunning}
        >
          <BlockContent
            blocks={richText}
            projectId={SanityClient.config().projectId}
            dataset={SanityClient.config().dataset}
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
                      />
                    </details>
                  );
                },
              },
            }}
          />
        </Section>
      ))}
    </>
  );
}
