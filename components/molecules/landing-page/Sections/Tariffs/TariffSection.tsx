import Typography from "@/components/atoms/typography/Typography"
import TariffCard from "./TariffCard"
import Container from "@/components/shared/Container/Container"

const TariffSection = () => {
  return (
    <Container>
      <section
        id="tariff"
        className="w-full scroll-mt-[125px] flex flex-col items-center gap-y-[40px] lg:gap-y-[80px] mb-[40px] xl:mb-[160px]"
      >
        <div className="flex flex-col gap-[24px] xl:gap-[40px] items-center">
          <div className="flex flex-col gap-[6px] items-center">
            <Typography className={"md:px-[1vw] lg:px-[8vw]"} color="lightGray" variants={"p"}>
              Тарифные планы
            </Typography>

            <Typography variants="h2" color="lightGray" className="text-center">
              Совсем <span className="text-PrimaryGreen">немного</span> <br />
              за профессиональный инструмент
            </Typography>
          </div>

          <Typography center className={"md:px-[1vw] lg:px-[8vw]"} color="darkGray" variants={"p"}>
            Наш нейросетевой CAT-Tool инструмент предлагает несколько тарифных планов, <br />
            чтобы удовлетворить различные потребности пользователей, <br className="hidden xl:flex" />
            от фрилансеров до крупных корпоративных клиентов
          </Typography>
        </div>

        <TariffCard />
      </section>
    </Container>
  )
}

export default TariffSection
