import Head from "next/head";
import Image from "next/image";
import Map from "../components/map-component";

export default function Home() {
  return (
    <main className={`min-h-screen`}>
      <Head>
        <title>Croux Map</title>
      </Head>
      <Map />
    </main>
  );
}
