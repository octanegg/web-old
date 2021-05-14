import Head from 'next/head'

export const Meta = ({ title, description }) => (
  <Head>
    <title>{title ? `${title} | Octane.gg` : 'Rocket League News & Coverage | Octane.gg'}</title>
    {description && <meta name="description" content={description} />}
  </Head>
)

export default Meta
