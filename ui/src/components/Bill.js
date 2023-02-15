import { useContext } from "react";
import { UserContext } from "../auth/UserContext";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Center,
  CardBody,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import moment from "moment";
import { createEngagement, deleteEngagement } from "../services/engagements";
import { buildCongressGovLink } from "../utils";

export default function Bill({ bill, engagement, setBillEngagements }) {
  const user = useContext(UserContext);
  const { userId } = user;

  // creates a bill engagement with the given boolean as the support value
  const setSupport = async (supportedByUser) => {
    const billId = `${bill.type}-${bill.number}`;
    const updatedEngagements = await createEngagement(
      billId,
      userId,
      supportedByUser
    );
    setBillEngagements(updatedEngagements.body);
  };

  // deletes the given engagement
  const undoSupport = async (engagementId) => {
    const updatedEngagements = await deleteEngagement(engagementId, userId);
    setBillEngagements(updatedEngagements.body);
  };

  // renders the undo support button
  const undoSupportButton = (engagementId) => {
    return (
      <Button
        leftIcon={<CloseIcon />}
        size="sm"
        colorScheme="red"
        variant="solid"
        onClick={() => undoSupport(engagementId)}
      >
        Undo Support
      </Button>
    );
  };

  return (
    <Card>
      <CardBody>
        <Flex>
          <Box width="70%">
            <Heading size="lg">
              {bill.type} {bill.number}
            </Heading>
            <Heading size="md">{bill.title.replaceAll("\\", "")} </Heading>
            <br />
            <Text>
              <Text as="b">Last Update: </Text>
              {bill.latestAction.text}
              <br />(
              {moment(bill.latestAction.actionDate, "YYYY-MM-DD").format(
                "MMMM DD, YYYY"
              )}
              )
              <br />
              <Link
                href={buildCongressGovLink(
                  bill.congress,
                  bill.type,
                  bill.number
                )}
                isExternal
              >
                <ExternalLinkIcon />
              </Link>
            </Text>
          </Box>
          {engagement ? (
            engagement.supportedByUser ? (
              <VStack width="30%">
                <Center>
                  <Text>
                    You{" "}
                    <Text as="span" color="green">
                      <b>Support</b>
                    </Text>{" "}
                    this bill
                  </Text>
                </Center>
                <Center>
                  <CheckIcon boxSize={6} color="green" />
                </Center>
                <br />
                {undoSupportButton(engagement.id)}
              </VStack>
            ) : (
              <VStack width="30%">
                <Center>
                  <Text>
                    You do{" "}
                    <Text as="span" color="red">
                      <b>Not Support</b>
                    </Text>{" "}
                    this bill
                  </Text>
                </Center>
                <Center>
                  <CloseIcon boxSize={4} color="red" />
                </Center>
                <br />
                {undoSupportButton(engagement.id)}
              </VStack>
            )
          ) : (
            <VStack width="30%">
              <Center>
                <Text>Do you support this bill?</Text>
              </Center>
              <Center>
                <ButtonGroup gap="4">
                  <Button
                    leftIcon={<CheckIcon />}
                    size="sm"
                    colorScheme="green"
                    variant="solid"
                    onClick={() => setSupport(true)}
                  >
                    Yes
                  </Button>
                  <Button
                    leftIcon={<CloseIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="solid"
                    onClick={() => setSupport(false)}
                  >
                    No
                  </Button>
                </ButtonGroup>
              </Center>
            </VStack>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}
