import NewsletterForm from "@/components/pages/newsletter/form";

export const metadata = {
  title: 'Newsletter'
};

export default function NewsletterPage() {
  return (
    <>
      <div className="max-w-lg mx-auto space-y-4">
        <h1>Stay Updated!</h1>
        <p>
          Subscribe to our newsletter and get the latest swap stories, events, and platform updates delivered straight to your inbox.
        </p>

        <NewsletterForm />
      </div>
    </>
  );
}
