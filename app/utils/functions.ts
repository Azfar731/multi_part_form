import clientData from "~/data/clients.json";
import services from "~/data/services.json";
import employees from "~/data/employees.json";
import record from "~/data/records.json";
import type { FormType } from "./types";
import * as fs from "fs";
import * as path from "path";
const getClientbyMobileNumber = (mobileNumberParam: string) => {
  const client = clientData.find(
    (client) => client.mobile_number === mobileNumberParam
  );
  return client || null;
};

const getAllServices = () => {
  return services;
};

const getService = (id: string) => {
  return services.find((service) => service.id === id);
};

const getAllEmployees = () => {
  return employees;
};

const getEmployee = (id: string) => {
  return employees.find((employee) => employee.id === id);
};

const createServiceRecord = async (formData: FormType) => {
  // Get existing records
  const filePath = path.join(process.cwd(), "app/data/records.json");
  const currentRecords = [...record];

  // Generate new ID
  const newId =
    currentRecords.length > 0
      ? Math.max(...currentRecords.map((record) => record.id)) + 1
      : 1;

  // Add new record with ID
  const recordWithId = { ...formData, id: newId };
  currentRecords.push(recordWithId);

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(currentRecords, null, 2));

  return { id: recordWithId.id, success: true, error_msg: null };
};

const getServiceRecord = (id: string | number) => {
  return record.find((rec) => rec.id === Number(id));
};

export {
  getEmployee,
  getClientbyMobileNumber,
  getService,
  getAllServices,
  getAllEmployees,
  createServiceRecord,
  getServiceRecord,
};
