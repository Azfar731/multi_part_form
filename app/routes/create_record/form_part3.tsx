import { Form, type LoaderFunctionArgs } from "react-router";
import { getAllEmployees } from "~/utils/functions";
import type { Route } from "./+types/form_part3";
import type { FormType } from "~/utils/types";
import { useOutletContext } from "react-router";

export async function loader() {
  const employees = await getAllEmployees();
  return { employees };
}

export default function FormPart3({ loaderData }: Route.ComponentProps) {
  const { employees } = loaderData;
  const { formData, setFormData } = useOutletContext<{
    formData: FormType;
    setFormData: React.Dispatch<React.SetStateAction<FormType>>;
  }>();

  return (
    <Form
      method="post"
      className="bg-white p-6 rounded shadow-md w-80 text-black"
    >
      <label
        htmlFor="employee"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Select Employee
      </label>
      <select
        name="employee"
        id="employee"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        value={formData.employee}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            employee: e.target.value,
          }))
        }
      >
        <option value="">-- Select an Employee --</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.first_name} {employee.last_name}
          </option>
        ))}
      </select>
    </Form>
  );
}
