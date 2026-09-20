import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import { getDictionary } from "@/i18n";

// One 404 for the whole site (static export serves it for any unknown URL).
// Its language follows the URL in the browser, like the rest of the chrome.
export const metadata = {
  title: getDictionary("vi").errors.notFoundTitle,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <ErrorScreen variant="notFound" />;
}
