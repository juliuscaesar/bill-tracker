import {
  Card,
  CardBody,
  Heading,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { calculateAverageInteractionRate } from "../utils";

export default function UserStatistics({ billEngagementsByUser, users, billEngagementCount }) {
  return (
    <Card minW="4xl">
      <CardBody>
        <Heading size="md">User Statistics</Heading>
        <br />
        <UnorderedList>
          <ListItem>
            <Text>
              <Text as="b">{Object.keys(billEngagementsByUser).length}</Text>{" "}
              out of <Text as="b">{users.length}</Text> registered users are
              engaged citizens- having indicated their support for at least one
              bill. (
              <Text as="b">
                {Math.round(
                  (Object.keys(billEngagementsByUser).length / users.length) *
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
  );
}
