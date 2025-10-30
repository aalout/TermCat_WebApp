import React from "react"
import Image from "next/image"
import Typography from "@/components/atoms/typography/Typography"
import fsi_logo from "@/public/images/fsi/fsi-minimize.png"
import Container from "@/components/shared/Container/Container"

function FSI() {
  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center w-full justify-center mb-20">
        <div>
          <Image width={200} height={114} src={fsi_logo} alt={"fsi-logo"} objectFit="cover" />
        </div>
        <Typography className="text-center md:text-start" variants="p" color="lightGray">
          Проект выполнен при&nbsp;поддержке
          <br />
          «Фонда содействия инновациям» в&nbsp;рамках <br />
          программы «Студенческий стартап» федерального <br />
          проекта «Платформа университетского <br />
          технологического предпринимательства».
        </Typography>
      </div>
    </Container>
  )
}

export default FSI
