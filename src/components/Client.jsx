import { useNavigate, Form, redirect } from "react-router-dom";
import { deleteClient } from "../data/clients";


export async function action({ params }) {
  await deleteClient(params.clientId)
  return redirect('/')
}
const Client = ({ client }) => {

  const navigate = useNavigate()

  const { name, phone, email, company, id } = client;
  return (
    <tr className="border-b">
      <td className="p-6 space-y-x">
        <p className="text-2xl text-gray-800">{name}</p>
        <p>{company}</p>
      </td>

      <td className="p-6">
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Email: {email} </span>
          <span className="text-gray-800 uppercase font-bold">Phone: {phone}</span>
        </p>
      </td>

      <td className="p-6 flex">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={ () => navigate(`/clients/${id}/edit`) }
        >
          Edit
        </button>
      </td>
      
      <td className="p-6 flex gap-3">

        <Form
          method="POST"
          action={`clients/${id}/delete`}
          onSubmit={() => {
            if (!confirm('Do you want to delete this record?')) {
              e.preventDefault()
            }
          }}
        >
        <button
          type="submit"
          className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
        >
          Delete
          </button>
          </Form>
      </td>

    </tr>
  );
};

export default Client;
