import { useContext } from "react";
import { UserContext } from "../auth/UserContext";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import moment from "moment";

export default function Navbar({ logout }) {
  const user = useContext(UserContext);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading size="lg">
              <Link href="/">Civix</Link>
            </Heading>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/female/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://avatars.dicebear.com/api/female/username.svg"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <b>
                      {user.firstName} {user.lastName}
                    </b>
                  </Center>
                  <Center>
                    <p>{user.email}</p>
                  </Center>
                  <Center>
                    Registered on:{" "}
                    {moment(user.registeredAt).format("M/D/YYYY")}
                  </Center>
                  <MenuDivider />
                  {
                    <MenuItem as="a" href="/">
                      {user.admin && "Citizen "}Dashboard
                    </MenuItem>
                  }
                  {user.admin && (
                    <MenuItem as="a" href="/admin">
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
