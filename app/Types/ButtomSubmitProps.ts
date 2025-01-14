import { UseFormHandleSubmit } from 'react-hook-form';

export type ButtomSubmitProps = {
    handleSubmit: UseFormHandleSubmit<{
        name: string;
        price: number;
        category: string;
        description: string;
        quantity: number;
        dosage: string;
        laboratory: string;
        requiresPrescription: string;
    }, undefined>;
}
