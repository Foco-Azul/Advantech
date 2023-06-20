import Image from "next/image";
import { ArrowRight } from "lucide-react";

function Hero({ hero }: any) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            {hero.short_title}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {`${hero.short_title} ${hero.short_title} ${hero.short_title} ${hero.short_title}`}
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-slate-500 text-gray-100 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {hero.cta} <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src={`${
              process.env.NEXT_PUBLIC_STRAPI_URL
            }/uploads/format_webp${hero.media.data.attributes.url.slice(8)}`}
            width={hero.media.data.attributes.width}
            height={hero.media.data.attributes.height}
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
