"use server";

export async function signin(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  console.log("signin->", formData);
  // delay 2s
  await new Promise((resolve) => setTimeout(resolve, 2000));
  state.error = "用户名或密码错误";
  return state;
}
