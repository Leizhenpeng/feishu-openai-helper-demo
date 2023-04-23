import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import {Toaster} from 'react-hot-toast';
import {ListPage} from '@/pages/list';
import {UsagePage} from '@/pages/usage';
import {NewPage} from '@/pages/new';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AppId} from '@/pages/app';
import {io_ui, io_ui as io} from 'kiss-msg';
import { event as e } from './event'

type App = {
    id: string
    name: string
    description: string
    icon: string
}
type PageProps = { apps: App[] }



const queryClient = new QueryClient();


function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        io?.send(e.UI_INIT, '');
    }, []);
    return (
        <>
            <QueryClientProvider client={ queryClient }>
                <Toaster></Toaster>
                <Router>
                    <main >
                        <Routes>
                            <Route path="" element={ <ListPage/> }/>
                            <Route path="/new" element={ <NewPage/> }/>
                            <Route path="/usage" element={ <UsagePage/> }/>
                            <Route path="/app/:id" element={<AppId />} />
                        </Routes>
                    </main>
                </Router>
            </QueryClientProvider>
        </>

    );
}

export default App;
