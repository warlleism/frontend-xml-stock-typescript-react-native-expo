import { UseFormHandleSubmit } from 'react-hook-form';

export type ButtomSubmitProps = {
    handleSubmit: UseFormHandleSubmit<{
        name: string;
        price: number;
        category: number;
        description: string;
        quantity: number;
        dosage: string;
        laboratory: string;
        requiresPrescription: boolean;
    }, undefined>;
}
