import React from 'react';
import { Button } from './Button'; // Adjust path as needed

export default {
  title: 'Button',
  component: Button,
  // Args define the default values for the component's props
  args: {
    label: 'Click Me',
    primary: false,
    size: 'medium',
    backgroundColor: '#007bff',
  },
};

const Template = (args: any) => <Button {...args} />;

// Default story
export const Default = Template.bind({});

// Story with primary button
export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Primary Button',
};

// Story with custom background color
export const CustomColor = Template.bind({});
CustomColor.args = {
  backgroundColor: '#28a745',
  label: 'Custom Color Button',
};
