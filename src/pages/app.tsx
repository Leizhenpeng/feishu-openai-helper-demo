import React from 'react';
import {useGenerateResult} from '@/hooks/useGenerateResult';
import {toast} from 'react-hot-toast';
import {Breadcrumb} from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import {Helmet} from 'react-helmet';
import LoadingDots from '@/components/LoadingDots';
import {isDev} from '@/utils/isDev';
import {copyText} from '@/utils/copyText';
import {marked} from 'marked';

interface AppIdProps {
    id: string;
}

type AppConfig = {
    id: string
    name: string
    description: string
    icon: string
    demoInput: string
    hint: string
}

type PageProps = { appConfig: AppConfig }

/*{
    id: '1',
     name: '回复老板',
    description: '用婉转的方式回复老板，拒绝PUA从我做起',
    icon: '☺️',
},*/
export function AppId() {
    const location = useLocation();
    const { data } = location.state;
    const newData = { ...data, id: `${data.id}` };
    // console.log(newData);
    // const appConfig = {
    //     id: '1',
    //     name: '回复老板',
    //     description: '用婉转的方式回复老板，拒绝PUA从我做起',
    //     icon: '☺️',
    //     demoInput: '老板，我想请假',
    // } as AppConfig;
    const { id, demoInput, description, icon, title } = newData;
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState(demoInput);
    const { generate, generatedResults ,stopStream} = useGenerateResult();

    const resultRef = useRef<null | HTMLDivElement>(null);

    const scrollToResults = () => {
        if (resultRef.current !== null) {
            resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleRun = async (e: any) => {

        if (loading) {
            return;
        }
        setLoading(true);

        e.preventDefault();
        await generate({ userInput, id });
        // incUsage.mutate(id)

        // scrollToResults();
        setLoading(false);
    };

    const handleStop = async (e: any) => {
        if (!loading) {
            return
        }
        stopStream()
        setLoading(false)
        e.preventDefault()
    }

    const handleAction = async (e: any) => {
        if (loading) {
            await handleStop(e)
        } else {
            await handleRun(e)
        }
    }

    return (
        <Layout>
            <Breadcrumb pages={  []}/>
            <div
                className="mx-auto flex max-w-3xl flex-col items-center justify-center py-2">
                <Helmet>
                    <title>{ title }</title>
                    <link
                        rel="icon"
                        href={ `data:image/svg+xml,<svg xmlns="%22http://www.w3.org/2000/svg%22" viewBox="%220" 0 100 100%22><text y="%22.9em%22" font-size="%2290%22">${ icon }</text></svg>` }

                    />
                </Helmet>

                <main
                    className="mt-6 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20 min-h-[300px]">
                    <h1 className="max-w-[708px] text-4xl font-bold text-slate-900 sm:text-6xl">
                        { title }
                    </h1>

                    <p className="mt-4 text-lg leading-8 text-gray-600">{ description }</p>

                    <div className="w-full max-w-xl">
                        <textarea
                            value={ userInput }
                            onChange={ (e) => setUserInput(e.target.value) }
                            rows={ 4 }
                            className="my-5 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black min-h-[110px]"
                            placeholder={ demoInput }
                        />

                        <button
                            className="mt-6 rounded-xl bg-black  py-2 font-medium text-white hover:bg-black/80 sm:mt-10 min-w-[80px] min-h-[40px]"
                            onClick={ (e) => handleAction(e) }
                        >
                            { loading ?
                                <LoadingDots color="white" style="large"/> : '运行' }
                        </button>

                        <div className="my-10 w-full space-y-10">
                            { generatedResults && (
                                <div className="flex flex-col gap-8">
                                    <h2
                                        className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                                        ref={ resultRef }
                                    >
                                        结果
                                    </h2>
                                    <div
                                        className="flex w-full flex-col items-center justify-center space-y-8">
                                        <div
                                            className="w-full cursor-copy rounded-xl border bg-white p-4 shadow-md transition"
                                            onClick={ () => {
                                                // navigator.clipboard.writeText(generatedResults);
                                                copyText(generatedResults).then(
                                                    () => {
                                                        toast('已复制结果到剪切板', {
                                                            icon: '✂️',
                                                        });
                                                    },
                                                )

                                            } }
                                        >

                                            <p className="whitespace-pre-line text-left markdown-body"
                                               dangerouslySetInnerHTML={ {
                                                   __html: marked(generatedResults.trimStart(), {
                                                       gfm: true,
                                                       smartLists:false,
                                                       breaks: false,
                                                       smartypants: false,
                                                   }),
                                               } }
                                            >
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
