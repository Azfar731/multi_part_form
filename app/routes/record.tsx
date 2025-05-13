import type { LoaderFunction, LoaderFunctionArgs } from "react-router";
import {
  getClientbyMobileNumber,
  getEmployee,
  getService,
  getServiceRecord,
} from "~/utils/functions";
import type { Route } from "./+types/record";
export async function loader({ params }: LoaderFunctionArgs) {
  debugger
  const { id: record_id } = params;
  if (!record_id) {
    throw new Error(`Required Parameter not found in URL`);
  }
  const service_record = getServiceRecord(record_id);
  if (!service_record) {
    throw new Error(`No record found with id: ${record_id}`);
  }
  const client = getClientbyMobileNumber(service_record.mobile_num);
  if (!client) {
    throw new Error(
      `No client found with mobile number: ${service_record.mobile_num}`
    );
  }

  const service = getService(service_record.service);
  if (!service) {
    throw new Error(`No service found with id: ${service_record.service}`);
  }

  const employee = getEmployee(service_record.employee);
  if (!employee) {
    throw new Error(`No employee found with id: ${service_record.employee}`);
  }

  return { service_record, service, client, employee };
}

export default function Record({ loaderData }: Route.ComponentProps) {
  const { service_record, service, client, employee } = loaderData;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="bg-white mt-14 p-8 rounded-lg shadow-md w-1/2 grid grid-cols-2 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 col-span-2 ">
          Record Details
        </h1>
        <h3 className="font-medium text-gray-700">Client Name</h3>
        <h3 className="text-gray-600">
          {client.first_name} {client.last_name}
        </h3>
        <h3 className="font-medium text-gray-700">Service</h3>
        <h3 className="text-gray-600">{service.name}</h3>

        <h3 className="font-medium text-gray-700">Employee Name</h3>
        <h3 className="text-gray-600">
          {employee.first_name} {employee.last_name}
        </h3>

        <h3 className="font-medium text-gray-700">Amount Charged</h3>
        <h3 className="text-gray-600">{service_record.amount_charged}</h3>

        <h3 className="font-medium text-gray-700">Amount Paid</h3>
        <h3 className="text-gray-600">{service_record.amount_paid}</h3>
      </div>
    </div>
  );
}
