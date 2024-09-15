export const getNotificationMessage = (
  notifType:
    | "mention"
    | "comment"
    | "like"
    | "accept"
    | "reject"
    | "request"
    | "followedYou"
    | "followedOthers",
  actor: string | undefined,
  reciever: string | undefined,
) => {
  switch (notifType) {
    case "mention":
      return `${actor} توی اون یکی عکس تگت کرده!`;
    case "comment":
      return ` ${actor} برای  اون یکی عکس کامنت داده  !`;
    case "like":
      return `${actor} این عکس رو لایک کرده!`;
    case "accept":
      return `${actor} درخواست دوستی ات رو قبول کرده!`;
    case "reject":
      return `${actor} درخواستت رو رد کرده!`;
      case "request":
        return `${actor} درخواست دوستی داده!`;
    case "followedOthers":
      return `${reciever}، ${actor} رو دنبال کرده!`;
    case "followedYou":
      return `${actor} دنبالت کرده!`;
  }
};

