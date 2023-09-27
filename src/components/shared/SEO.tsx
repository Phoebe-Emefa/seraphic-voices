import defaultImage from "../../../public/images/seraphic-voices.png";

import favicon from "../../../public/icons/favicon.ico";
import appleTouchIcon from "../../../public/icons/apple-touch-icon.png";
import faviconMedium from "../../../public/icons/favicon-16x16.png";
import faviconLarge from "../../../public/icons/favicon-32x32.png";

type SEOProps = {
  title?: string;
  description?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  path: string;
};

export const SEO = (props: SEOProps) => {
  const image = props.image ?? defaultImage;
  const title = props.title ? `${props.title} | Seraphic Voices of Toronto` : "Seraphic Voices of Toronto";
  const description =
    props.description ?? "Explore the fusion of Western and African music, fostering cross-cultural connections";
  const url = `https://www.seraphicvoicestoronto.com${props.path}`;
  return (
    <>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.src} />
      <meta property="og:image:width" content={String(image.width)} />
      <meta property="og:image:height" content={String(image.height)} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image.src} />
      <meta property="twitter:image:width" content={String(image.width)} />
      <meta property="twitter:image:height" content={String(image.height)} />

      <meta content="width=device-width, initial-scale=1" name="viewport" />

      <link
        rel="apple-touch-icon"
        sizes={`${appleTouchIcon.height}x${appleTouchIcon.width}`}
        href={appleTouchIcon.src}
      />
      <link
        rel="icon"
        type="image/png"
        sizes={`${faviconLarge.height}x${faviconLarge.width}`}
        href={faviconLarge.src}
      />
      <link
        rel="icon"
        type="image/png"
        sizes={`${faviconMedium.height}x${faviconMedium.width}`}
        href={faviconMedium.src}
      />
      <link rel="icon" href={favicon.src} />
    </>
  );
};