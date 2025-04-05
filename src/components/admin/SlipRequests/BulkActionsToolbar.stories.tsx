import type { Meta, StoryObj } from '@storybook/react';

import BulkActionsToolbar from './BulkActionsToolbar';

const meta = {
  component: BulkActionsToolbar,
} satisfies Meta<typeof BulkActionsToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};