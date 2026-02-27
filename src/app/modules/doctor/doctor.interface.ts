export type TDoctor = {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: "MALE" | "FEMALE" | "OTHER";
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace?: string | null;
    designation: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type TCreateDoctorInput = {
    password: string;
    doctor: {
        name: string;
        email: string;
        contactNumber: string;
        address: string;
        registrationNumber: string;
        gender: "MALE" | "FEMALE" | "OTHER";
        appointmentFee: number;
        qualification: string;
        designation: string;
        experience?: number;
        currentWorkingPlace?: string;
        profilePhoto?: string;
    };
};
