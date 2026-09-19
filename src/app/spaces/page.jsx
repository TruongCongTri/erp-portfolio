import ListingPage from "@/components/ListingPage/ListingPage";
import { spaces, spacesListing, toSpaceListItem } from "@/data/spaces";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Dự án",
  description:
    "Danh sách dự án thiết kế và thi công của Chính Nam: biệt thự, nhà phố, resort, công trình văn hóa và thương mại.",
  path: "/spaces",
});

const page = () => {
  return <ListingPage {...spacesListing} items={spaces.map(toSpaceListItem)} />;
};

export default page;
