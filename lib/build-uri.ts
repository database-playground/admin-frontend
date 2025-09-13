export default function buildUri(path: string) {
  const normalizedPath = path.replace(/\/+$/, "");

  return new URL(normalizedPath, process.env.NEXT_PUBLIC_BACKEND_BASE_URL).toString();
}
