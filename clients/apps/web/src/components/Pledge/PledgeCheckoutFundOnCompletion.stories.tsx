import type { Meta, StoryObj } from '@storybook/react'

import PledgeCheckoutFundOnCompletion from './PledgeCheckoutFundOnCompletion'

import { UserContextProvider } from '@/providers/auth'
import { issue, org } from '@/utils/testdata'

const meta: Meta<typeof PledgeCheckoutFundOnCompletion> = {
  title: 'Organisms/PledgeCheckoutFundOnCompletion',
  component: PledgeCheckoutFundOnCompletion,
  tags: ['autodocs'],
  parameters: {
    themes: ['light', 'dark'],
    nextjs: {
      appDirectory: true,
    },
  },
  render: (args) => (
    <UserContextProvider user={undefined} userOrganizations={[]}>
      <div className="max-w-[400px]">
        <PledgeCheckoutFundOnCompletion {...args} />
      </div>
    </UserContextProvider>
  ),
}

export default meta

type Story = StoryObj<typeof PledgeCheckoutFundOnCompletion>

export const Default: Story = {
  args: {
    issue: issue,
    organization: org,
  },
}
