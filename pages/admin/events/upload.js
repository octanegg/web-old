import { Content } from '@octane/components/common/Layout'
import { Flex, Spinner, Stack } from '@chakra-ui/react'
import Navigation from '@octane/components/common/Navigation'
import { useRef, useState } from 'react'
import { uploadEventImage } from '@octane/util/s3'
import { Button } from '@octane/components/common/Button'
import { getServerSideAuth, isAdmin } from '@octane/util/auth'

const Admin = () => {
  const fileInput = useRef()
  const [fileName, setFileName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleImageChange = () => {
    if (fileInput.current?.files?.length > 0) {
      setFileName(fileInput.current.files[0].name)
    }
  }

  const handleSubmit = async () => {
    if (fileInput.current?.files?.length > 0) {
      setSubmitting(true)
      await uploadEventImage(fileInput)
      window.location.reload()
    }
  }

  return (
    <Content>
      <Stack width="full" spacing={3}>
        <Navigation type="admin" active="events" />
        <Navigation type="adminEvents" active="upload" hasDivider />
        <Stack width="full" direction="column" paddingLeft={8}>
          <Flex width="full" direction="row">
            <input
              type="file"
              id="file1"
              name="file1"
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={handleImageChange}
            />
            <Button override={{ width: 64, height: 8 }} onClick={() => fileInput.current.click()}>
              {fileName}
            </Button>
          </Flex>
          <Flex width="full" direction="row">
            <Button override={{ width: 64, height: 8 }} onClick={handleSubmit}>
              {submitting ? <Spinner /> : 'Submit'}
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req }) {
  const auth = getServerSideAuth(req)
  if (!isAdmin(auth)) {
    return {
      notFound: true,
    }
  }

  return {
    props: { auth },
  }
}

export default Admin
