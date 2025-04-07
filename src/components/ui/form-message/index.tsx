
type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement> & {
  error?: { message?: string };
};

export default function FormMessage({
  error,
  children,
  ...props
}: FormMessageProps) {
  const body = error ? String(error?.message ?? "") : children;

  if (!body) return null;
  return <p {...props}>{body}</p>;
}
