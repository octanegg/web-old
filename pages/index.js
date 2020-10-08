import RecentArticles from "../components/homepage/RecentArticles";
import { Content } from "../components/Layout";

const ARTICLES_MOCK = [
  {
    image: "https://octane.gg/headers/rlcs-x.jpg",
    title: "RLCS X is finally here!",
    description: "The next season of the long awaited rlcs x has started and the Rocket League Esports fans could not be happier!"
  },
  {
    image: "https://i.imgur.com/ePUi4ns.jpg",
    title: "RLCS X Fall Split: OCE Regional 3 Preview",
    description: "Some very cool description, that is long enough and interesting enough! I swear it is!"
  },
  {
    image: "https://i.imgur.com/d5txSyH.png",
    title: "Down Two Earth Picks Up Continuum",
    description: "Some very cool description, that is long enough and interesting enough! I swear it is!"
  }
];

const Home = () => {
  return <Content>
    <RecentArticles articles={ARTICLES_MOCK} />
  </Content>;
};

export default Home;
