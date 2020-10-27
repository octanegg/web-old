import { Text } from '@chakra-ui/core'
import Link from 'next/link'
import { Content } from '../components/Layout'

const Error = () => {
  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <Text>
        error, go 👉 <Link href="/">home</Link>.
      </Text>
    </Content>
  )
}

export default Error
