import * as React from 'react';

// NavigationConatiner is refered here - Check NavigationStack
export const navigationRef = React.createRef();

const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
}

const goBack = () => {
  navigationRef.current?.goBack();
}

export {
  navigate,
  goBack,
};
