import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <h1 className='mb-5'>Home Page (Static Side Rendering)</h1>
            <h3>Image in Image Component</h3>
            <div className={styles.heroWrap}>
                <Image src='/pic.jpg' layout='fill' objectFit='cover' />
            </div>
            <h3>Image in img tag</h3>
            <div className={styles.heroWrap}>
                <img src='/pic.jpg' className={styles.img} />
            </div>
            <div className='d-flex flex-column m-5'>
                <Link href='/serverSideRender'>
                    <a className='m-3'>Server Side Rendering</a>
                </Link>
                <Link href='/serverSideRenderHome'>
                    <a className='m-3'>Server Side Rendering Home</a>
                </Link>
                <Link href='/clientSideRender'>
                    <a className='m-3'>Client Side Rendering</a>
                </Link>
                <Link href='/clientSideRenderImg'>
                    <a className='m-3'>Client Side Rendering using img tag</a>
                </Link>
                <Link href='/staticSideRender'>
                    <a className='m-3'>Static Side Rendering (Optimized in production)</a>
                </Link>
                <Link href='/revalidOnDemand'>
                    <a className='m-3'>Revalidate On demand</a>
                </Link>
            </div>
        </div>
    );
}
