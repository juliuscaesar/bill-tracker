import { useContext, useState, useEffect } from "react";
import { UserContext } from "../auth/UserContext";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Heading,
  Progress,
  Spinner,
  useDisclosure,
  Table,
  Tr,
  Td,
  Text,
  UnorderedList,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { getAllBills } from "../services/bills";
import { getAllBillEngagements } from "../services/engagements";
import { getAllUsers } from "../services/users";
import Navbar from "./Navbar";
import LogoutAlert from "./LogoutAlert";
import {
  calculateAverageInteractionRate,
  calculateSupportRate,
  getBillTitle,
  getSupportBreakdownByDate,
} from "../utils";

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
    console.log(billEngagements.body.billEngagementsSortedByBillId);
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
            <Card minW="4xl">
              <CardBody>
                <Heading size="md">User Statistics</Heading>
                <br />
                <UnorderedList>
                  <ListItem>
                    <Text>
                      <Text as="b">
                        {Object.keys(billEngagementsByUser).length}
                      </Text>{" "}
                      out of <Text as="b">{users.length}</Text> registered users
                      are engaged citizens- having indicated their support for
                      at least one bill. (
                      <Text as="b">
                        {Math.round(
                          (Object.keys(billEngagementsByUser).length /
                            users.length) *
                            100
                        )}
                        %
                      </Text>
                      )
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      Users have indicated their support for a total of{" "}
                      <Text as="b">{billEngagementCount}</Text> bills.
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      Engaged users have indicated support for an average of{" "}
                      <Text as="b">
                        {calculateAverageInteractionRate(billEngagementsByUser)}
                      </Text>{" "}
                      bills each.
                    </Text>
                  </ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
            {Object.keys(billEngagementsByBill).map((key) => {
              let { totalSupport, totalOppose, supportRate } =
                calculateSupportRate(billEngagementsByBill[key]);
              let supportRateByDate = getSupportBreakdownByDate(
                billEngagementsByBill[key]
              );
              return (
                <Card key={key} minW="4xl">
                  <CardBody>
                    <Heading size="md">{key}</Heading>
                    <Text>{getBillTitle(key, bills)}</Text>
                    <br />
                    <Progress
                      colorScheme="green"
                      size="lg"
                      value={supportRate}
                    />
                    <br />
                    <Center>
                      <Text>
                        <Text as="b">{supportRate}%</Text> support (
                        {totalSupport} total) |{" "}
                        <Text as="b">{100 - supportRate}%</Text> oppose (
                        {totalOppose} total)
                      </Text>
                    </Center>
                    <br />
                    <Accordion allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              View breakdown by date
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Table>
                            {Object.keys(supportRateByDate).map((key) => (
                              <Tr>
                                <Td>{key}</Td>
                                <Td>{supportRateByDate[key]}%</Td>
                              </Tr>
                            ))}
                          </Table>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </CardBody>
                </Card>
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
