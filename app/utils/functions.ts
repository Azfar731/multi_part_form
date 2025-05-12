import clientData from "~/data/clients.json";
import services from "~/data/services.json"
const getClientbyMobileNumber = (mobileNumberParam: string) => {
  const client = clientData.find(
    (client) => client.mobile_number === mobileNumberParam
  );
  return client || null;
};

const getServices = ()=> {
    return services
}


export {getClientbyMobileNumber, getServices};