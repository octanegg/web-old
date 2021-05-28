import Head from 'next/head'

export const Meta = ({ title, description, url, image }) => {
  const _title = title ? `${title} | Octane.gg` : 'Rocket League News & Coverage | Octane.gg'
  const _description =
    description ||
    'The home of Rocket League esports - featuring news, event overviews, match schedules and results, in-depth statistics and analytics, and much more!'
  const _image = image || 'https://beta.octane.gg/images/logo.svg'

  return (
    <Head>
      <title>{_title}</title>
      <meta name="description" content={_description} />

      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />

      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />
      <meta property="og:image" content={_image} />
      <meta property="og:site_name" content="Octane.gg" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@octane_gg" />
      <meta name="twitter:creator" content="@octane_gg" />
      <meta name="twitter:title" content={_title} />
      <meta name="twitter:description" content={_description} />
      <meta name="twitter:image" content={_image} />

      {url && (
        <>
          <link rel="canonical" href={url} />
          <meta property="og:url" content={url} />
          <meta name="twitter:url" content={url} />
        </>
      )}

      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
    </Head>
  )
}

export default Meta
