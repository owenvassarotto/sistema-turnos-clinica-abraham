import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/utils";

// Define the type for the patient data
interface PatientData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: Date;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocumentUrl?: string;
  occupation: string;
  privacyConsent?: boolean;
  treatmentConsent?: boolean;
  disclosureConsent?: boolean;
}

interface UserInfoModalProps {
  patientData: PatientData;
}

// Verifica si la URL es válida (no contiene "undefined")
const isUrlValid = (url: string) => !url.includes("undefined");

export function UserInfoModal({ patientData }: UserInfoModalProps) {
  const excludedFields = [
    "$id",
    "$tenant",
    "$createdAt",
    "$updatedAt",
    "$permissions",
    "$databaseId",
    "$collectionId",
    "userId",
    "privacyConsent",
    "treatmentConsent",
    "disclosureConsent",
    "identificationDocumentId",
  ];

  // Traducción de las claves
  const keyTranslations: Record<string, string> = {
    name: "Nombre",
    email: "Correo Electrónico",
    phone: "Teléfono",
    gender: "Género",
    birthDate: "Fecha de Nacimiento",
    address: "Dirección",
    emergencyContactName: "Nombre de Contacto de Emergencia",
    emergencyContactNumber: "Número de Contacto de Emergencia",
    insuranceProvider: "Proveedor de Seguro",
    insurancePolicyNumber: "Número de Póliza de Seguro",
    allergies: "Alergias",
    currentMedication: "Medicamentos Actuales",
    familyMedicalHistory: "Historia Médica Familiar",
    pastMedicalHistory: "Historia Médica Pasada",
    identificationType: "Tipo de Identificación",
    identificationNumber: "Número de Identificación",
    identificationDocumentUrl: "URL del Documento de Identificación",
    occupation: "Ocupación",
  };

  const translateKey = (key: string): string => {
    return keyTranslations[key] || formatKey(key);
  };

  const formatKey = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Ver Información" className="underline">
          {patientData.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md max-h-full overflow-scroll">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle>Información del Paciente</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(patientData)
            .filter(
              ([key, value]) =>
                value &&
                !excludedFields.includes(key) &&
                (typeof value !== "string" || !value.includes("undefined"))
            )
            .map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500">
                  {translateKey(key)}:
                </span>
                <span className={`text-lg text-gray-300 ${key === "gender" && 'capitalize'}`}>
                  {key === "birthDate" ? (
                    formatDateTime(value).dateOnly
                  ) : key.includes("Url") ? (
                    <a
                      href={value as string}
                      className="text-green-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver documento
                    </a>
                  ) : (
                    (value as string)
                  )}
                </span>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
