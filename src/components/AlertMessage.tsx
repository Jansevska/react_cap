import Alert from 'react-bootstrap/Alert'; 
import CategoryType from '../types/category';

type AlertMessageProps = {
    message: string|null,
    category: CategoryType,
    flashMessage: (message:string|null, category:CategoryType|null) => void
}

export default function AlertMessage({ message, category, flashMessage }: AlertMessageProps) {
    return (
        <Alert data-bs-theme="light" variant={category} dismissible onClose={() => flashMessage(null, null)}>{ message }</Alert>
    )
}