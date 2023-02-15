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
  Heading,
  Progress,
  Table,
  Text,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { getBillTitle } from "../utils";

export default function BillStatistics({
  billId,
  bills,
  supportRate,
  totalSupport,
  totalOppose,
  supportRateByDate,
}) {
  return (
    <Card key={billId} minW="4xl">
      <CardBody>
        <Heading size="md">{billId}</Heading>
        <Text>{getBillTitle(billId, bills)}</Text>
        <br />
        <Progress colorScheme="green" size="lg" value={supportRate} />
        <br />
        <Center>
          <Text>
            <Text as="b">{supportRate}%</Text> support ({totalSupport} total) |{" "}
            <Text as="b">{100 - supportRate}%</Text> oppose ({totalOppose}{" "}
            total)
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
                <Tbody>
                  {Object.keys(supportRateByDate).map((date) => (
                    <Tr key={date}>
                      <Td>{date}</Td>
                      <Td>{supportRateByDate[date]}%</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}
