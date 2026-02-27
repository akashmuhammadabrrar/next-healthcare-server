export type TAdmin = {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type TCreateAdminInput = {
    password: string;
    admin: {
        name: string;
        email: string;
        contactNumber: string;
        profilePhoto?: string;
    };
};
