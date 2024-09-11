export const getNotificationMessage = (
  notifType:
    | "tag"
    | "comment"
    | "like"
    | "accept"
    | "reject"
    | "request"
    | "followedYou"
    | "followedOthers",
  subject: string | undefined,
  user: string | undefined,
) => {
  switch (notifType) {
    case "tag":
      return `${subject} توی اون یکی عکس تگت کرده!`;
    case "comment":
      return ` ${subject} برای  اون یکی عکس کامنت داده  !`;
    case "like":
      return `${subject} این عکس رو لایک کرده!`;
    case "accept":
      return `${subject} درخواست دوستی ات رو قبول کرده!`;
    case "reject":
      return `${subject} درخواستت رو رد کرده!`;
      case "request":
        return `${subject} درخواست دوستی داده!`;
    case "followedOthers":
      return `${user}، ${subject} رو دنبال کرده!`;
    case "followedYou":
      return `${subject} دنبالت کرده!`;
  }
};
