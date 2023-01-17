import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import MyLink from './MyLink';

const getTree = (result: null | ReactTestRendererJSON | ReactTestRendererJSON[]): ReactTestRendererJSON => {
  if (!result) {
    throw new Error('invalid tree');
  }

  let tree: ReactTestRendererJSON;
  if (Array.isArray(result)) {
    [tree] = result;
  } else {
    tree = result;
  }

  return tree;
};

describe('Link Component Test', () => {
  it('changes the class when hovered', () => {
    const component = renderer.create(
      <MyLink page="https://www.facebook.com">Facebook</MyLink>,
    );
    let tree = getTree(component.toJSON());

    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => { tree.props.onMouseEnter(); });

    // re-rendering
    tree = getTree(component.toJSON());
    expect(true).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => { tree.props.onMouseLeave(); });

    // re-rendering
    tree = getTree(component.toJSON());
    expect(true).toMatchSnapshot();
  });
});
