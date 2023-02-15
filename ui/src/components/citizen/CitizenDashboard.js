import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../auth/UserContext";
import {
  Center,
  Container,
  Heading,
  Stack,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { getAllBills } from "../../services/bills";
import { getEngagementsByUserId } from "../../services/engagements";
import Bill from "./Bill";
import Navbar from "../shared/Navbar";
import LogoutAlert from "../shared/LogoutAlert";
import { getBillEngagement } from "../../utils";

function CitizenDashboard() {
  const [bills, setBills] = useState([]);
  const [billEngagements, setBillEngagements] = useState([]);
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
    const billEngagements = await getEngagementsByUserId(user.userId);
    setBillEngagements(billEngagements.body);
    setBills(bills.body);
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
          Bill Tracker 🗳️
        </Heading>
        {loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <Stack spacing="1.5rem">
            {bills.map((bill) => (
              <Bill
                key={`${bill.type}-${bill.number}`}
                bill={bill}
                engagement={getBillEngagement(
                  `${bill.type}-${bill.number}`,
                  billEngagements
                )}
                setBillEngagements={setBillEngagements}
              />
            ))}
          </Stack>
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

export default CitizenDashboard;
