import React, { ReactElement, useEffect, useState } from 'react';
import SanityClient from '../client';
import Header from './header';
import Guide from './guide';
import '../App.css';

interface Props {

}

export default function Landing({}: Props): ReactElement {
  const [selectedGuide, setSelectedGuide] = useState('');
  const [availableGuides, setAvailableGuides] = useState([] as string[]);
  useEffect(() => {
    SanityClient.fetch(
      `*[_type == 'template' && defined(sections)]
{
name
}`,
    ).then((data) => {
      setAvailableGuides(data.map((d: {name: string}) => d.name));
      const localSelectedGuide = localStorage.getItem('SelectedGuide');
      if (localSelectedGuide && data.findIndex((d:{name: string}) => d.name == localSelectedGuide) !== -1) {
        setSelectedGuide(localSelectedGuide);
      }
    }).catch((error) => {
      console.log('Error getting data from CMS', error);
    });
  }, []);
  const confirmSelection = (selection: string) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const con = confirm('Make this my default template?');
    if (con) {
      localStorage.setItem('SelectedGuide', selection);
      setSelectedGuide(selection);
    }
  };
  const resetTemplateButton = ({
    text: 'Change Template',
    clickHandler: () => {
      localStorage.removeItem('SelectedGuide');
      setSelectedGuide('');
    },
  });
  return (
    <div id="App">
      <Header
        buttons={[resetTemplateButton]}
      />
      {selectedGuide ? (<Guide template={selectedGuide} />)
        : availableGuides.map((ag) => (
          <button type="button" onClick={() => { confirmSelection(ag); }}>{ag}</button>
        ))}
    </div>
  );
}
