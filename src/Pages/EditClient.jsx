import { getClient, updateClient } from "../data/clients";
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"; 
import Formulary from "../components/Formulary";
import Fix from "../components/Fix";

export async function loader({ params }) {
  const client = await getClient(params.clientId);
  if (Object.values(client).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No Results Found'
    })
  }

  return client;
  
}

export async function action({request, params}) {
  const formData = await request.formData()

  const data = Object.fromEntries(formData);

  const email = formData.get('email')

  // Validation
  const fix =  []
  if (Object.values(data).includes('')) {
    fix.push('All fields are mandatory')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!regex.test(email)) {
    fix.push('The Email is not valid')
  }

  //Return fix and data
  if (Object.keys(fix).length) {
    return fix
  }

  // Update Client
  await updateClient(params.clientId, data)

  return redirect('/')
}
  
  
const EditClient = () => {
  const navigate = useNavigate();
  const client = useLoaderData()
  const fixs = useActionData();

  return (
    <>
    <h1 className="font-black text-4xl text-blue-900">Edit Client</h1>
    <p className="nt-3">Here you can modify the customer data.</p>

    <div className="flex justify-end">
      <button
        className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>

    <div className="bg-white shadow rounded-md md:w-/4 mx-auto px-5 py-10 mt-20">

       {fixs?.length && fixs.map((fix, i) => <Fix key={i}>{ fix }</Fix> )} 
      <Form
        method="POST"
        noValidate
      >
          <Formulary
          client={client}
          />

        <input
          type="submit"
          className="mt-5 w-full bg-blue-800  uppercase font-bold text-white text-lg"
          value="Save Change"
          />
        
        </Form>
    </div>
  </>
  )
}

export default EditClient
