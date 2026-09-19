import ListingPage from "@/components/ListingPage/ListingPage";
import ApplyForm from "@/components/ApplyForm/ApplyForm";
import { jobs, jobsListing, toJobListItem } from "@/data/jobs";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Tuyển dụng",
  description:
    "Cơ hội nghề nghiệp tại Chính Nam: kỹ thuật công trình, kiến trúc - thiết kế, kinh doanh, kế toán - tài chính, hành chính - nhân sự.",
  path: "/hiring",
});

const page = () => {
  return (
    <ListingPage {...jobsListing} items={jobs.map(toJobListItem)}>
      <ApplyForm
        callout="Ứng tuyển tự do"
        title="Haven't found a job that suits you? If you'd like to contribute, just apply using this form."
      />
    </ListingPage>
  );
};

export default page;
