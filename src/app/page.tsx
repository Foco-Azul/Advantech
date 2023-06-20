import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavMenu from "@/components/NavMenu";
import PricingPlan from "@/components/PricingPlan";

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
    console.log(error);
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
  console.log(heroData.data.attributes.media);
  const hero = heroData.data.attributes;

  return (
    <>
      <header className="w-full relative">
        <NavMenu />
      </header>
      <Hero hero={hero} />
      <PricingPlan plans={pricings} />
      <Footer />
    </>
  );
}
