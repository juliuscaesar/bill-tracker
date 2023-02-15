import { useContext, useState, useEffect } from "react";
import { UserContext } from "../auth/UserContext";
import {
  Center,
  Container,
  Heading,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { getAllBills } from "../services/bills";
import { getAllBillEngagements } from "../services/engagements";
import { getAllUsers } from "../services/users";
import Navbar from "./Navbar";
import LogoutAlert from "./LogoutAlert";
import UserStatistics from "./UserStatistics";
import BillStatistics from "./BillStatistics";
import { calculateSupportRate, getSupportBreakdownByDate } from "../utils";

function AdminDashboard() {
  const [bills, setBills] = useState([]);
  const [billEngagementsByUser, setBillEngagementsByUser] = useState({});
  const [billEngagementsByBill, setBillEngagementsByBill] = useState({});
  const [billEngagementCount, setBillEngagementCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);

  // for the error message alert
  const {
    isOpen: alertIsVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  // fetch the bills and engagement data
  const fetchData = async () => {
    const bills = await getAllBills();
    const billEngagements = await getAllBillEngagements();
    const users = await getAllUsers();
    setBillEngagementsByUser(
      billEngagements.body.billEngagementsSortedByUserId
    );
    setBillEngagementsByBill(
      billEngagements.body.billEngagementsSortedByBillId
    );
    setBillEngagementCount(billEngagements.body.numberOfEngagements);
    setBills(bills.body);
    setUsers(users.body);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Navbar logout={onOpen} />
      <Container maxW="4xl" style={stx.billsContainer}>
        {alertIsVisible && <LogoutAlert onClose={onClose} />}
        <Heading size="lg" style={stx.billTrackerHeading}>
          Admin Dashboard 🗳️
        </Heading>
        {loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <VStack spacing="1.5rem">
            <UserStatistics
              billEngagementsByUser={billEngagementsByUser}
              numberOfUsers={users.length}
              billEngagementCount={billEngagementCount}
            />
            {Object.keys(billEngagementsByBill).map((billId) => {
              let { totalSupport, totalOppose, supportRate } =
                calculateSupportRate(billEngagementsByBill[billId]);
              let supportRateByDate = getSupportBreakdownByDate(
                billEngagementsByBill[billId]
              );
              return (
                <BillStatistics
                  key={billId}
                  billId={billId}
                  bills={bills}
                  supportRate={supportRate}
                  totalSupport={totalSupport}
                  totalOppose={totalOppose}
                  supportRateByDate={supportRateByDate}
                />
              );
            })}
          </VStack>
        )}
      </Container>
    </UserContext.Provider>
  );
}

const stx = {
  billsContainer: {
    marginTop: "2rem",
    paddingBottom: "2rem",
  },
  billTrackerHeading: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
};

export default AdminDashboard;
