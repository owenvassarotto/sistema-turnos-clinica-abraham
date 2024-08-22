"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { getUser } from "./patient.actions";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }

        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

// lib/email.js
export const sendEmail = async (
  to: string,
  subject: string,
  emailContent: string
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          emailContent,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al enviar el correo");
    }

    await response.json();
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    const user = await getUser(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const emailContent =
      type === "schedule"
        ? `
        <p style="color: #444444; font-size: 16px; margin-bottom: 20px;">Estimado/a ${
          user.name
        },</p>
        <p style="color: #444444; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Le informamos que su cita ha sido programada para el <strong style="color: #333333;">${
            formatDateTime(appointment.schedule).dateOnly
          } a las ${
            formatDateTime(appointment.schedule).timeOnly
          }</strong> con el Dr./Dra. <strong style="color: #333333;">${
            appointment.primaryPhysician
          }</strong>.
        </p>
        <p style="color: #444444; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Le rogamos llegar 10 minutos antes de la hora programada.
        </p>
        <p style="color: #444444; font-size: 16px; line-height: 1.6;">
          Atentamente,<br>El equipo médico.
        </p>
      `
        : `
        <p style="color: #444444; font-size: 16px; margin-bottom: 20px;">Estimado/a ${
          user.name
        },</p>
        <p style="color: #444444; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Lamentamos informarle que su cita programada para el <strong style="color: #333333;">${
            formatDateTime(appointment.schedule).dateOnly
          } a las ${
            formatDateTime(appointment.schedule).timeOnly
          }</strong> con el Dr./Dra. <strong style="color: #333333;">${
            appointment.primaryPhysician
          }</strong> ha sido cancelada debido a: <strong>${
            appointment.cancellationReason
          }</strong>.
        </p>
        <p style="color: #444444; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Por favor, contáctenos para reprogramar su cita a la mayor brevedad posible.
        </p>
        <p style="color: #444444; font-size: 16px; line-height: 1.6;">
          Atentamente,<br>El equipo médico.
        </p>
      `;

    // E-mail notification
    await sendEmail(user.email, "Notificación de Turno - Clínica Abraham", emailContent);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};
