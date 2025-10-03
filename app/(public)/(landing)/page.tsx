import TermCat from "@/components/molecules/landing-page/Sections/TermCat/TermCat"
import Stats from "@/components/molecules/landing-page/Sections/Stats/Stats"
import Points from "@/components/molecules/landing-page/Sections/Points/Points"
import Features from "@/components/molecules/landing-page/Sections/Features/Features"
import TariffSection from "@/components/molecules/landing-page/Sections/Tariffs/TariffSection"
import FAQ from "@/components/molecules/landing-page/Sections/FAQ/FAQ"
import Feedback from "@/components/molecules/landing-page/Sections/Feedback/Feedback"
import Script from "next/script"
import { PageSchema } from "@/app/(public)/(landing)/constants"
import { Metadata } from "next"
import { getStaticMeta } from "@/utils/getStaticMeta"
import FSI from "@/components/shared/FSI/fsi"

export const metadata: Metadata = { ...getStaticMeta("/") }

export default function LandingPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/inline-script-id */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PageSchema)
        }}
      />
      <TermCat />
      <Stats />
      <Points />
      <Features />
      <TariffSection />
      <Feedback />
      <FAQ />
      <FSI />
    </>
  )
}
