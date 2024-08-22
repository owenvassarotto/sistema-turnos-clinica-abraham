"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT= 'phoneInput',
  CHECKBOX= 'checkbox',
  DATE_PICKER= 'datePicker',
  SELECT= 'select',
  SKELETON = 'skeleton'
}

export default function PatientForm() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    try {
      const userData = {
        name,
        email,
        phone
      }

      const user = await createUser(userData)

      if(user) router.push(`/patients/${user.$id}/register`)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
            <h1 className="header">¡Bienvenido paciente! 👋</h1>
            <p className="text-dark-700">Solicita una cita completando el siguiente formulario.</p>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Nombre completo"
          placeholder="Juan Perez"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          isRequired={true}
        />

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="juanperez@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          isRequired={true}
        />

        <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Número de teléfono"
          placeholder="(261) 123-4567"
          iconSrc="/assets/icons/phone.svg"
          iconAlt="phone"
          isRequired={true}
        />

        <SubmitButton isLoading={isLoading}>Empezar</SubmitButton>
      </form>
    </Form>
  )
}
