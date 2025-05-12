import { Form, replace, type LoaderFunctionArgs } from "react-router";
import { getClientbyMobileNumber, getServices } from "~/utils/functions";
import type { Route } from "./+types/form_part2";

export async function loader({ request }: LoaderFunctionArgs) {
  const mobile_num = new URL(request.url).searchParams.get("mobile_num");
  if (!mobile_num) {
    throw replace(`/create_record`);
  }
  const client = getClientbyMobileNumber(mobile_num);
  if (!client) {
    throw replace(`/create_record`);
  }
  const services = getServices();

  return { client, services };
}

export default function FormPart2({ loaderData }: Route.ComponentProps) {
  const { client, services } = loaderData;

  return (
    <Form
      method="post"
      // onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80 text-black"
    >
      <div className="block text-gray-700 text-sm font-bold mb-2">
        Client Name:
        <span className="font-semibold">
          {`${client.first_name} ${client.last_name}`}
        </span>
      </div>
      <div className="block text-gray-700 text-sm font-bold mb-2">
        Mobile Number:
        <span className="font-semibold">{client.mobile_number}</span>
      </div>
      <label htmlFor="services">Select Servics</label>
      <select
        name="services"
        id="services"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
      >
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
      <label
        htmlFor="amount_charged"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Amount Charged
      </label>
      <input
        type="number"
        name="amount_charged"
        id="amount_charged"
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        min={0}
        required
      />
      <label
        htmlFor="amount_paid"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Amount Paid
      </label>
      <input
        type="number"
        name="amount_paid"
        id="amount_paid"
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        min={0}
        required
      />
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          //   onClick={GoToPrevPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </Form>
  );
}
