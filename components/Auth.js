import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/core";
import { useEffect, useState } from "react";

export const AdminOnly = ({ children }) => {
  const roles = ["admin"]
  const [allowed, setAllowed] = useState(false);
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

  const getUserRoles = async () => {
    const claims = await getIdTokenClaims();
    const userRoles = claims ? claims["http://octane.gg/claims/role"] : [];
    setAllowed(roles.every((v) => userRoles.includes(v)));
  };

  useEffect(() => {
    getUserRoles();
  }, [roles]);

  return isLoading ? (
    <Spinner />
  ) : isAuthenticated && allowed ? (
    children
  ) : (
    <div></div>
  );
};

export default AdminOnly;
