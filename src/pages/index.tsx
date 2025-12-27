import { ContentFeed } from "../components/home/content-feed";
import { FEED } from "../components/home/feed-dummy";

export default function Home() {
  return <ContentFeed items={FEED} />;
}
