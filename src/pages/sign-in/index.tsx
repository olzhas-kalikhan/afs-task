import Input from "@/components/ui/input";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormMessage from "@/components/ui/form-message";
import Button from "@/components/ui/button";
import styles from "./sign-in.module.scss";
import { authStore } from "@/store/auth-store";
import Cookies from "js-cookie";

const useSignIn = () => {
  return useMutation({
    mutationFn: async (user: string) => {
      const response = await axios.get("/auth", { params: { user } });
      const token = response.headers["authorization"];

      return { user, token };
    },
    onSuccess: ({ user, token }) => {
      Cookies.set("authToken", token.split(" ")[1], {
        secure: true,
      });
      authStore.setUser({ userName: user });
    },
  });
};

const signInSchema = z.object({
  userName: z.string({ required_error: "UserName can't be empty" }),
});

export default function SignInPage() {
  const signInMutation = useSignIn();
  const form = useForm({
    defaultValues: {
      userName: "",
    },
    resolver: zodResolver(signInSchema),
  });
  const { errors } = form.formState;
  return (
    <div className={styles["sign-in"]}>
      <form
        className={styles["sign-in__form"]}
        onSubmit={form.handleSubmit((values) =>
          signInMutation.mutate(values.userName)
        )}
      >
        <Input {...form.register("userName")} placeholder="Username" />
        <FormMessage error={errors.userName} />
        <Button type="submit">Sign In </Button>
      </form>
    </div>
  );
}
