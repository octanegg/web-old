import { Stack } from '@chakra-ui/core'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { PaginationButton } from '@octane/components/common/Button'

const Pagination = ({ page, onChange }) => {
  const prev = page == 1 ? 1 : page - 1
  const _page = page == 1 ? 2 : page
  const next = page == 1 ? 3 : page + 1

  return (
    <Stack direction="row" marginTop={2} marginLeft={2} marginRight={2}>
      <PaginationButton onClick={() => onChange(prev)} isDisabled={page == 1}>
        <ArrowBackIcon boxSize={3} />
      </PaginationButton>
      <PaginationButton isActive={page == 1} onClick={() => onChange(prev)}>
        {prev}
      </PaginationButton>
      <PaginationButton isActive={page != 1 && true} onClick={() => onChange(_page)}>
        {_page}
      </PaginationButton>
      <PaginationButton onClick={() => onChange(next)}>{next}</PaginationButton>
      <PaginationButton onClick={() => onChange(next)}>
        <ArrowForwardIcon boxSize={3} />
      </PaginationButton>
    </Stack>
  )
}

export default Pagination
