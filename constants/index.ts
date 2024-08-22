export const GenderOptions = ["masculino", "femenino", "otro"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "masculino" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "DNI (Documento Nacional de Identidad)",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "DNI (Documento Nacional de Identidad)",
  "Licencia de Conducir",
  "Pasaporte",
  "Carnet de Obra Social o Seguro Médico",
  "Cédula de Identidad",
  "Libreta Cívica",
  "Libreta de Enrolamiento",
  "Credencial de Trabajo",
  "Partida de Nacimiento",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Carlos Abraham",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Florencia Albornoz",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Owen Vassarotto",
  }
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
