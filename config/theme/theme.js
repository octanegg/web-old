import { extendTheme } from '@chakra-ui/react'

const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      25: '#e5fff4',
      50: '#e0fdef',
      100: '#bbf2d7',
      200: '#94e8be',
      300: '#6cdea4',
      400: '#44d48c',
      500: '#30C97B', // Octane Green
      600: '#1e9158',
      700: '#12683e',
      800: '#043f24',
      900: '#001708',
    },
    secondary: {
      25: '#f1f8ff',
      50: '#E4F2FF',
      100: '#D8E6FE',
      150: '#D0DEF6',
      200: '#BECCE4',
      300: '#A5B3CB',
      400: '#8B99B1',
      500: '#728098',
      600: '#58667e',
      700: '#3F4D65',
      800: '#25334B', // Octane Blue
      900: '#0C1A32',
    },
    tertiary: {
      50: '#FFF0F3',
      100: '#FFE3E6',
      200: '#FFC9CC',
      300: '#FF9699',
      400: '#FC6366',
      500: '#C93033',
      600: '#B0171A',
      700: '#960000',
      800: '#7D0000',
      900: '#630000',
    },
    border: '#ddd',
    hover: '#e8f4fd',
    win: '#30C97B',
    loss: '#FC6366',
  },
  shadows: {
    main: '0 1px 3px -1px rgba(0, 0, 0, 0.4)',
    navbar: '0 -4px 1px -1px #2EC97B inset',
    focus: '#e0fdef 0px 0px 0px 4px',
  },
  borders: {
    main: '1px solid #ddd',
    navbar: '1px solid black',
    pic: '5px solid #44d48c',
    focus: '1px solid #44d48c',
    secondary: '1px solid #25334B',
    win: '3px solid #6cdea4',
    loss: '3px solid #FF9699',
  },
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semi: 600,
    bold: 700,
    extra: 800,
    black: 900,
  },
}

export default extendTheme(theme)
