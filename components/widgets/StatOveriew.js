import { Stack, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'

export const StatOverviewWidget = ({ stats }) => (
  <Stack direction="row" paddingLeft={2} spacing={0} wrap="wrap" shouldWrapChildren>
    {stats.map(({ label, stat, helper }) => (
      <Stat width={40} padding={2}>
        <StatLabel color="secondary.600">{label}</StatLabel>
        <StatNumber fontWeight="semi" color="secondary.700">
          {stat}
        </StatNumber>
        <StatHelpText color="secondary.600" fontSize="sm">
          {helper}
        </StatHelpText>
      </Stat>
    ))}
  </Stack>
)

export default StatOverviewWidget
