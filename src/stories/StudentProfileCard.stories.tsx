import { Meta, StoryFn } from '@storybook/react';
import StudentProfileCard, { StudentProfileCardProps } from './StudentProfileCard';

export default {
  title: 'Components/StudentProfileCard',
  component: StudentProfileCard,
} as Meta;

const Template: StoryFn<StudentProfileCardProps> = (args) => <StudentProfileCard {...args} />;

export const ActiveSlip = Template.bind({});
ActiveSlip.args = {
  name: 'John Doe',
  studentId: '123456',
  yearLevel: 'Junior',
  section: 'B',
  slipStatus: 'active',
};

export const ExpiredSlip = Template.bind({});
ExpiredSlip.args = {
  name: 'Jane Smith',
  studentId: '654321',
  yearLevel: 'Senior',
  section: 'A',
  slipStatus: 'expired',
};
