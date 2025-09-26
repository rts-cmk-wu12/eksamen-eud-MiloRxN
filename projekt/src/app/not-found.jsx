import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center absolute inset-0">
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-primary mb-4">Page Not Found</h2>
      <p className="text-silver mb-6 text-center max-w-md">
        We’re sorry, but the page or listing you’re looking for couldn’t be found. It may have been moved or no longer exists.
      </p>
      <Link
        className="px-6 py-2 button-primary"
        href="/"
      >
        Return to Listings
      </Link>
    </div>
  );
}
