import moment from "moment";

// matches an engagement to a given Bill ID
export const getBillEngagement = (billId, billEngagements) => {
  return billEngagements.find((engagement) => engagement.billId === billId);
};

// calculates the number of bills the average user interacts with
export const calculateAverageInteractionRate = (billEngagementsByUser) => {
  const totalUsers = Object.keys(billEngagementsByUser).length;
  let sum = 0;
  for (const userId in billEngagementsByUser) {
    sum += billEngagementsByUser[userId].length;
  }

  return Math.floor(sum / totalUsers);
};

// Calculates the average support for a bill from a given array of engagements
export const calculateSupportRate = (engagements) => {
  let totalEngagements = engagements.length;
  let totalSupport = 0;
  let totalOppose = 0;

  // eslint-disable-next-line
  engagements.map((engagement) => {
    if (engagement.supportedByUser) {
      totalSupport++;
    } else {
      totalOppose++;
    }
  });

  const supportRate = Math.round((totalSupport / totalEngagements) * 100);
  return { totalSupport, totalOppose, supportRate };
};

// Gets the Bill title associated with the given Bill ID
export const getBillTitle = (billId, bills) => {
  const billNumber = billId.split("-")[1];
  return bills
    .find((bill) => bill.number === billNumber)
    .title.replaceAll("\\", "");
};

// organizes the engagements for a bill by date and calculates the support rate for each date
export const getSupportBreakdownByDate = (engagements) => {
  let engagementsOrganizedByDate = {};
  let supportRateByDate = {};

  // eslint-disable-next-line
  engagements.map((engagement) => {
    let formattedDate = moment(
      engagement.createdAt,
      "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
    ).format("MMMM DD, YYYY");
    if (engagementsOrganizedByDate[formattedDate]) {
      engagementsOrganizedByDate[formattedDate].push(engagement);
    } else {
      engagementsOrganizedByDate[formattedDate] = [engagement];
    }
  });

  // eslint-disable-next-line
  Object.keys(engagementsOrganizedByDate).map((key) => {
    let totalSupport = 0;
    let total = engagementsOrganizedByDate[key].length;

    engagementsOrganizedByDate[key].map(
      (engagement) => (totalSupport += engagement.supportedByUser)
    );

    supportRateByDate[key] = Math.round((totalSupport / total) * 100);
  });

  return supportRateByDate;
};
