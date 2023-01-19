import React from 'react';

import { sum } from '@/utils';
import MyLink from '@/components/MyLink';
import MyCheckbox from '@/components/MyCheckbox';
import MyFetch from '@/components/MyFetch';

export default function Index() {
  return (
    <div style={{ padding: '1rem' }}>
      <div>Hello World</div>
      <div>{sum(1, 2)}</div>
      <div>
        <MyLink page="https://www.facebook.com">Facebook</MyLink>
      </div>
      <div>
        <MyCheckbox
          htmlFor="check-1"
          labelOn="ON"
          labelOff="OFF"
        />
      </div>
      <div>
        <MyFetch url="/greeting" />
      </div>
    </div>
  );
}
