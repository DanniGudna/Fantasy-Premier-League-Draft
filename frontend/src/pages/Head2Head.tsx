import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import ContentCard from '../Components/Common/ContentCard/ContentCard';
import Head2HeadContainer from '../Components/Head2Head/Head2HeadContainer';

function Head2Head(): ReactElement {
  return (
    <div className="grid grid-cols-1 dark:bg-darkmode-background">
      <ContentCard>
        <Head2HeadContainer />
      </ContentCard>
    </div>
  );
}

export default Head2Head;
