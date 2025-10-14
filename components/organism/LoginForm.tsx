"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

import { SignInYandexButton } from "@/components/organism/SignInYandexButton/sign-in-yandex-button"

import { loginUser } from "@/package/api/auth/login-user"
import FormTitle from "@/components/molecules/FormTitle"
import FormBottomLink from "@/components/molecules/FormBottomLink"
import InputField from "@/components/input/InputField"
import Button from "@/components/atoms/button/Button"

function RegistrationForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const userData = await loginUser({ email, password })
      if (userData.status === 200) {
        router.push("/WebApp")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[85vw] md:w-[55vw] lg:w-[518px] py-[3vh] px-[3vw] xl:px-[2vw]
      bg-white rounded-[24px] gap-[12px] md:gap-[18px] lg:gap-[24px] z-[1000] text-PrimaryBlack"
    >
      <FormTitle
        title={
          <>
            Добро пожаловать <br /> в TermCat
          </>
        }
        description={
          <>
            Войдите в аккаунт, чтобы использовать <br /> инновационный CAT инструмент
          </>
        }
      />

      <div className="w-full flex justify-center opacity-30">
        <SignInYandexButton />
      </div>

      <div className="flex flex-col gap-[12px] md:gap-[18px] lg:gap-[24px] px-[2vw] xl:px-[0vw]">
        <div className="flex flex-col w-full gap-y-2">
          <InputField
            placeholder="Введите почту"
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            placeholder="Введите пароль"
            label="Пароль"
            type="password"
            hide
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="w-full mt-[1vh]">
          <Button className="w-full" type="submit" variant="primary" size="big" form="rounded">
            Войти
          </Button>
        </div>

        <FormBottomLink move={"Создать бесплатный аккаунт"} href={"/registration"} question={"У вас нет аккаунта?"} />
      </div>
    </form>
  )
}

export default RegistrationForm
