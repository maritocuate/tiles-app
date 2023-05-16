import type { Meta, StoryObj } from '@storybook/react'
import { BiDollar } from 'react-icons/bi'
import { AiFillStar, AiFillCheckCircle } from 'react-icons/ai'
import Button from './index'

const icons = { BiDollar, AiFillStar, AiFillCheckCircle }

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: 'Name'
  },
  argTypes: {
    icon: {
      options: Object.keys(icons), 
      mapping: icons, 
      control: {
        type: 'select',
        labels: {
          BiDollar: 'Dollar',
          AiFillStar: 'Star',
          AiFillCheckCircle: 'Check',
        },
      },
    },
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    label: 'Button',
  },
}