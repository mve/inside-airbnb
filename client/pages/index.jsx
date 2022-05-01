import Head from 'next/head'
import NavBar from '../components/core/NavBar'
import Footer from '../components/core/Footer'
import Map from '../components/map/map';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Inside Airbnb</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <NavBar />

      <main className="container mx-auto">
        Main content here...

        <Map />

      </main>

      <Footer />
    </div>
  )
}
