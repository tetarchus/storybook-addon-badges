import Admonition from '@theme/Admonition';

const ParameterWarning = () => (
  <Admonition type='warning'>
    <p>
      If defining your configuration as a <code>parameter</code> in the preview file, this option
      cannot accept a function value due to how Storybook serializes parameters.
    </p>
  </Admonition>
);

export { ParameterWarning };
