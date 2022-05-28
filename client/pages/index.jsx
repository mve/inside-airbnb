import Head from 'next/head'
import NavBar from '../components/core/NavBar'
import Footer from '../components/core/Footer'
import Map from '../components/map/map';
import Admin from '../components/admin/admin';
import { Auth0Provider } from "@auth0/auth0-react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Inside Airbnb</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <NavBar/>

      <main className="container mx-auto">
        Main content here...

        <Map/>

        <Auth0Provider
          domain="dev-q9qzn2lm.us.auth0.com"
          clientId="5eDc8JhFc7TylAQiiyFRnaW38VL4Qmrb"
          redirectUri="http://localhost:3000/"
          scope="read:statistics"
          audience="https://localhost:7114/"
        >
          <Admin/>
        </Auth0Provider>


      </main>

      <Footer/>
    </div>
  )
}
