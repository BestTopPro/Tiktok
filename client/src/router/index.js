import { useRoutes} from 'react-router-dom'
import Tiktok from '../component/tiktok/Tiktok'

export default function Router() {
    const router = [
        {
            path    : '/',
            element : <Tiktok />
        },
    ]
    return useRoutes(router);
}
