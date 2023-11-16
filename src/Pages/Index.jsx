import { useLoaderData } from "react-router-dom";
import Client from "../components/Client"
import { getClients } from '../data/clients'

export function loader() {
  const clients = getClients()

  return clients;
}

const Index = () => {

  const clients = useLoaderData();


  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clients</h1>
      <p className="nt-3">Manage your Clients</p>

      {clients.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clients</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map(client => (
              <Client
                client={client}
                key={client.id}
              />
            ))}
          </tbody>
        </table>
      ) : <p className="tex-center mt-18">No clients yet</p>}
      </>
  )
}

export default Index
