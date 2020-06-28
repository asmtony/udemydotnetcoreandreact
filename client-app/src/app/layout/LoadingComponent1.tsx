import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';


const LoadingComponent1: React.FC<{ inverted?: boolean, content?: string }> = ({
  inverted = true,
  content = "Loading..."
}) => {
  return (

    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
export default LoadingComponent1;
