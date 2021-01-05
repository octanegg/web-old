import { Content } from '@octane/components/common/Layout'
import MemberInfo from '@octane/components/about/MemberInfo'
import { Flex, Stack, Text } from '@chakra-ui/core'

const staff = [
  {
    name: 'Zeebo',
    twitter: 'ZeeboDesigns',
    roles: ['Lead Graphic Designer', 'Full Stack Developer'],
    pic: 'https://pbs.twimg.com/profile_images/1211645238210703360/8-xQrKyz_400x400.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ipsum lacus, dapibus vel elit ac, commodo hendrerit ipsum. Aliquam consequat in magna ac semper. Cras blandit, erat eget dignissim sagittis, est quam lobortis ipsum, id dictum velit lorem id lacus. Cras at vulputate lacus, vitae egestas nulla. Quisque et urna quis est gravida consectetur.',
  },
]

const AboutUs = () => {
  return (
    <Content>
      <Stack direction="row" spacing={0} flexWrap="wrap" justify="space-around">
        {[0, 1, 2, 3, 4].map(() => (
          <MemberInfo info={staff[0]} />
        ))}
      </Stack>
    </Content>
  )
}

export default AboutUs
