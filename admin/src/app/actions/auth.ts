export async function signin(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  console.log("signin->", formData);
  // delay 2s
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { error: "Invalid email or password" };
}
