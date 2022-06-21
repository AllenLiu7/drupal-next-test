import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>Image in Image Component</h3>
      <div className={styles.heroWrap}>
        <Image src="/pic.jpg" layout="fill" objectFit="cover"/>
      </div>
      <h3>Image in img tag</h3>
      <div className={styles.heroWrap}>
        <img src="/pic.jpg" className={styles.img}/>
      </div>
      <Link href="/staticSideRender">
        <a>Static Side Rendering</a>
      </Link>
      <Link href="/clientSideRender">
        <a>Client Side Rendering</a>
      </Link>
    </div>
  )
}
