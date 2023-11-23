import { Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LogInProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faHouse,
  faPen,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();

  const navigate = useNavigate();

  const urlParams = new URLSearchParams();

  const location = useLocation();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("id", login.id);
  }

  function handleLogout() {
    axios.post("/api/member/logout").then(() => {
      toast({
        description: "로그아웃 되었습니다.",
        status: "info",
      });
      navigate("/");
    });
  }

  return (
    <Flex mb={10}>
      <Button
        leftIcon={<FontAwesomeIcon icon={faHouse} />}
        borderRadius={0}
        variant={"ghost"}
        size={"lg"}
        onClick={() => navigate("/")}
      >
        HOME
      </Button>
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant={"ghost"}
          size={"lg"}
          leftIcon={<FontAwesomeIcon icon={faPen} />}
          onClick={() => navigate("/write")}
        >
          작성
        </Button>
      )}
      <Spacer />
      {isAuthenticated() || (
        <Button
          borderRadius={0}
          variant={"ghost"}
          size={"lg"}
          leftIcon={<FontAwesomeIcon icon={faUser} />}
          onClick={() => navigate("/signup")}
        >
          회원가입
        </Button>
      )}
      {isAdmin() && (
        <Button
          borderRadius={0}
          variant={"ghost"}
          size={"lg"}
          leftIcon={<FontAwesomeIcon icon={faUsers} />}
          onClick={() => navigate("/member/list")}
        >
          회원목록
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant={"ghost"}
          size={"lg"}
          leftIcon={<FontAwesomeIcon icon={faCircleInfo} />}
          onClick={() => navigate("/member?" + urlParams.toString())}
        >
          회원정보
        </Button>
      )}
      {isAuthenticated() || (
        <Button
          borderRadius={0}
          variant={"ghost"}
          size={"lg"}
          leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
          onClick={() => navigate("/login")}
        >
          로그인
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant={"ghost"}
          size={"lg"}
          leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      )}
    </Flex>
  );
}
