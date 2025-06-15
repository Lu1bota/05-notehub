import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.error}>
      <strong>⚠️ Error</strong>
      <p>{message}</p>
    </div>
  );
}
