import React from 'react';

import { sum } from '@/utils';

export default function Index() {
  return (
    <>
      <div>Hello World</div>
      <div>{sum(1, 2)}</div>
    </>
  );
}
