import ShowComment from "./Posts/ShowComment";

const defaultProps = {
  accountName: 'متین',
  commentTime: "۱ هفته پیش",
  commentMessage: 'خیلی عکس قشنگ و جالبیه. جایی رو می‌شناسی که این دکور رو بسازن؟',
  parentID: '123qwsdad',
  postID: '123htjrn',
  likes: 337,
};

const TestPage = () => {
  return (
    <ShowComment {...defaultProps} /> 
  );
};

export default TestPage;
