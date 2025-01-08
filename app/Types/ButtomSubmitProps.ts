import { UseFormHandleSubmit } from 'react-hook-form';

export type ButtomSubmitProps = {
    handleSubmit: UseFormHandleSubmit<{
        name: string;
        price: string;
        category: string;
        description: string;
        quantity: string;
    }, undefined>;
}
