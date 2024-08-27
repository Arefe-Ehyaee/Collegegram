import timeTranslate from "../utilities/timeTranslationFunction";



const defaultProps = {
comments:50,
bookmarks:3,
  likes: 337,
};

const TestPage = () => {
  
  return (
    <div dir="rtl" className="text-4xl">{timeTranslate("2022-07-27 11:43:31.408585")}</div>
  );
};

export default TestPage;
