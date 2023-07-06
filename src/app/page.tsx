import Seccion_1 from "@/components/Inicio/Seccion_1";
import Seccion_2 from "@/components/Inicio/Seccion_2";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavMenu from "@/components/NavMenu";
import { Providers } from "./providers";

export const dynamic = "force-dynamic";

async function getPricingData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pricing`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        cache: "no-store",
      }
    );
    if (response.status != 200) {
      throw new Error(`Failed to fetch data, ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {

    throw new Error(`Failed to fetch data, ${error}`);
  }
}
async function getHeroData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/inicio?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        cache: "no-store",
      }
    );

    if (response.status != 200) {
      throw new Error(`Failed to fetch data, ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data, ${error}`);
  }
}

export default async function Page() {
  const pricingData = await getPricingData();
  const pricings = [
    pricingData.data.attributes["plan_01"],
    pricingData.data.attributes["plan_02"],
    pricingData.data.attributes["plan_03"],
  ];

  const heroData = await getHeroData();

  const hero = heroData.data.attributes;

  return (
    <Providers >

      <div className="hero-back">
        <>
          <header className="w-full relative">
            <NavMenu />
          </header>
          <Hero hero={hero} />
          <Seccion_2 />
          <Seccion_1 />
          <Footer />
        </>
      </div>

    </Providers>


  );
}
