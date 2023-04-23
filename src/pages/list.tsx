import {SearchInput} from '@/components/SearchInput';
import AppList from '@/components/AppList';
import * as R from 'ramda';
import {Button} from '@/components/Button';
import React from 'react';
import {Hero} from '@/components/Hero';
import Layout from '@/components/Layout';
import {useQuery} from 'react-query';
import {getAllApps} from '@/utils/api/app';
import {AppBaseInfo} from '@/utils/types';
import {useEffect} from 'react';
export function ListPage() {
    const [searchValue, setSearchValue] = useState('');
    const [sizeToShow, setSizeToShow] = useState(20);
    const location = useLocation();

    useEffect(() => {
        // console.log(location);
        if (location.search) {
            // console.log('收到自定义参数：', location.search);
            // if include list true
            const searchParams = new URLSearchParams(location.search);
            const list = searchParams.get('list');
            if (list) {
                scrollToSearch()
            }
        }
    }, [location]);

    const {  data } = useQuery('apps', getAllApps);
    const apps = (data || []) as AppBaseInfo[];
    const list = searchValue
        ? apps.filter(
            (app) =>
                app.name.includes(searchValue) ||
                app.description.includes(searchValue),
        )
        : apps;

    const handleShowMore = () => {
        setSizeToShow(Math.min(sizeToShow + 20, apps.length));
    };


    const searchRef = useRef<null | HTMLDivElement>(null);

    const scrollToSearch = () => {
        if (searchRef.current !== null) {
            searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    };


    return (
        <Layout>
            <Hero/>
            <div className="w-full bg-slate-50 pb-20 pt-1" ref={ searchRef }>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[440px]">
                    <div
                        onClick={scrollToSearch}
                        className="mb-10 grid grid-cols-1 items-center justify-between pt-6 sm:grid-cols-3 sm:pt-0 ">
                        <div    />
                        { apps.length > 0 &&
                        <SearchInput

                            setSearchValue={ setSearchValue }
                            placeholder={ `咦~ 草丛里发现 ${ apps.length } 个锦囊...` }
                        />}
                        <div/>
                    </div>
                    <AppList list={ R.take(sizeToShow, list) }/>
                    <div className="mt-10 flex justify-center">
                        {sizeToShow < list.length && (
                            <Button color="slate" onClick={handleShowMore}>
                                加载更多...
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {/*<CallToAction />*/ }
        </Layout>
    );
}
