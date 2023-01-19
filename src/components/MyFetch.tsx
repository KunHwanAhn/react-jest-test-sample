import React, { useState, useReducer } from 'react';
import axios from 'axios';

interface MyState {
  error: unknown | null;
  greeting: string | null;
}
type MyReducerAtion = {
  type: 'SUCCESS' | 'ERROR';
} & MyState;

const initialState: MyState = {
  error: null,
  greeting: null,
};

function greetingReducer(state: MyState, action: MyReducerAtion): MyState {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      };
    }

    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      };
    }

    default: {
      return state;
    }
  }
}

interface MyResponse {
  data: {
    greeting: string;
  };
}

interface MyFetchProps {
  url: string;
}
export default function MyFetch({ url }: MyFetchProps) {
  const [state, dispatch] = useReducer(greetingReducer, initialState);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchGreeting = async (_url: string) => {
    try {
      const { data } = await axios.get(_url) as MyResponse;

      dispatch({
        type: 'SUCCESS',
        greeting: data.greeting,
        error: null,
      });
      setButtonClicked(() => true);
    } catch (error) {
      dispatch({
        type: 'ERROR',
        greeting: null,
        error,
      });
    }
  };
  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting';

  return (
    <div>
      <button
        type="button"
        onClick={() => { fetchGreeting(url); }}
        disabled={buttonClicked}
      >
        {buttonText}
      </button>
      {!!state.greeting && <h1>{state.greeting}</h1>}
      {!!state.error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  );
}
