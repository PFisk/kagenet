import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Album } from '../components/Album'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>KageNet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to KageNet.
        </h1>
          <Album/>
      </main>

      <footer className={styles.footer}>
        <p>
          Any questions or suggestions? Contact us at <a className={styles.email} href="mailto: chrst@itu.dk">chrst@itu.dk</a> or <a className={styles.email} href="mailto: phfi@itu.dk">phfi@itu.dk</a>
        </p>
      </footer>
    </div>
  )
}
