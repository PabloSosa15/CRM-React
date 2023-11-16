import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError()

    return (
        <div className='space-y-8'>
            <h1 className='text-center text-6xl font-extrabold mt-200 text-blue-900'> CRM - Clients</h1>
            <p className='text-center'>There was an error</p>
            <p className='text-center'>{error.statusText || error.message}</p>
        </div>
    )

}