import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { drupal } from '../lib/drupal';
import { getParams } from '../lib/getParam';
import { toBaseUrl } from '../lib/urlBuilder';
import styles from '../styles/Home.module.css';

export default function ServerRenderHome({data}) {
    return (
        <div className={styles.container}>
            <h3>Image in Image Component</h3>
            <div className={styles.heroWrap}>
                <Image src={toBaseUrl(data[0].field_banner.thumbnail.uri.url)} layout='fill' objectFit='cover' />
            </div>
            <h3>Image in img tag</h3>
            <div className={styles.heroWrap}>
                <img src={toBaseUrl(data[0].field_banner.thumbnail.uri.url)} className={styles.img} />
            </div>
  
            <pre>{JSON.stringify(data[0].field_banner.thumbnail.uri.url, undefined, 2)}</pre>
        </div>
    );
}

export async function getServerSideProps() {
  const data = await drupal.getResourceCollection('node--home_page', {
      params: getParams()
          .addInclude([
              'field_banner.field_media_image'
          ])
          .addFields('file--file', [
            'uri'
          ])
          .getQueryObject(),
  });

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
      props: {
          data,
      },
  };
}
