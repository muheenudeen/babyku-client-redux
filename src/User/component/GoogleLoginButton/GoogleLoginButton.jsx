import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get("http://localhost:3002/api/auth/google", {
          withCredentials: true, 
        });

        console.log("User Info:", userInfo.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: () => console.log("Google login failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="bg-red-500 text-white p-2 rounded-md w-full"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
