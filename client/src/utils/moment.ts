import moment from "moment";

export const timeAgo = (date: any) => {
   //    moment.updateLocale('en', {
   //       relativeTime : {
   //           future: "in %s",
   //           past:   "%s ago",
   //       }
   //   });
   return moment(date).fromNow()
}