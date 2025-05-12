import {
  Form,
  replace,
  useActionData,
  useOutletContext,
  useSubmit,
  type ActionFunctionArgs,
} from "react-router";
import type { FormType } from "~/utils/types";
import { getClientbyMobileNumber } from "~/utils/functions";
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const mobile_num = formData.get("mobile_num")?.toString() || "";
  if (!mobile_num) {
    return { msg: "No mobile number received" };
  }

  // Fetch the client
  const client = await getClientbyMobileNumber(mobile_num); // returns client object or null
  if (!client) {
    return { msg: `No client with mobile number: ${mobile_num} found` };
  }

  // Redirect to the next part of the process
  const redirectUrl = `form_part2?mobile_num=${encodeURIComponent(mobile_num)}`;
  throw replace(redirectUrl);
}

//helper functions

export default function Form_Part1() {
  const actionData = useActionData<{ msg: string }>();
  const { formData, setFormData } = useOutletContext<{
    formData: FormType;
    setFormData: React.Dispatch<React.SetStateAction<FormType>>;
  }>();
  const submit = useSubmit();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const mobile_num = formData.get("mobile_num")?.toString() || "";
    console.log("Form value: ", mobile_num);
    setFormData((prev) => ({ ...prev, mobile_num }));
    submit(form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form
        method="post"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 text-black"
      >
        <label
          htmlFor="mobile_num"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Enter Client Mobile Number
        </label>
        <input
          type="text"
          id="mobile_num"
          name="mobile_num"
          pattern="^0[0-9]{10}$"
          placeholder="03334290689"
          defaultValue={formData.mobile_num}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          required
        />
        {actionData ? (
          <div className="text-red-700">{actionData.msg}</div>
        ) : undefined}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          Next
        </button>
      </Form>
    </div>
  );
}
