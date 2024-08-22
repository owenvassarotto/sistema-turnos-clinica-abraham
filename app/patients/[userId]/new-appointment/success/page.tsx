import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getUser } from "@/lib/actions/patient.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Sentry from "@sentry/nextjs";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_appointment-success", user.name);
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
           <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-16 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="Solicitud enviada con éxito"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            ¡Tu <span className="text-green-500">solicitud de cita</span> se
            envió correctamente!
          </h2>
          <p>Te contactaremos pronto para confirmar tu cita.</p>
        </section>

        <section className="request-details">
          <p>Detalles de la cita solicitada:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              width={100}
              height={100}
              alt={`Foto de ${doctor?.name}`}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              width={24}
              height={24}
              alt="Icono de calendario"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>Nueva Cita</Link>
        </Button>

        <p className="copyright">
          &copy; {new Date().getFullYear()} Clínica Abraham
        </p>
      </div>
    </div>
  );
};

export default Success;
