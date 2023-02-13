import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Code,
  CloseButton,
} from "@chakra-ui/react";

// the logout alert that displays when a user attempts to logout
export default function LogoutAlert({ onClose }) {
  return (
    <Alert status="error">
      <AlertIcon />
      <Box>
        <AlertTitle>I didn't implement authentication 😆</AlertTitle>
        <AlertDescription>
          The "logged in user" is being provided by{" "}
          <Code colorScheme="red">src/auth/UserContext.js</Code>. You can switch
          between the citizen and admin dashboard from the dropdown and see what
          happens when you revoke admin privileges by modifying the{" "}
          <Code colorScheme="red">UserContext</Code>.
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
}
