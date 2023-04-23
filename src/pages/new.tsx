import React, {useState} from 'react';
import {Breadcrumb} from '@/components/Breadcrumb';
import {Button} from '@/components/Button';
import {EmojiField} from '@/components/EmojiField';
import Layout from '@/components/Layout';
import {useGenerateResult} from '@/hooks/useGenerateResult';
import {createAppSchema} from '@/utils/api';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {CreateInputs} from '@/utils/types';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {Helmet} from 'react-helmet';
import {useMutation} from 'react-query';
import {HOST_URL} from '@/utils/hostUrl';
import {isDev} from '@/utils/isDev';
import {copyText} from '@/utils/copyText';
import {marked} from 'marked';

export function NewPage() {
    const [isTesting, setIsTesting] = useState(false);
    const [hasTested, setHasTested] = useState(false);
    const { generate, generatedResults, stopStream } = useGenerateResult();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<CreateInputs>({ resolver: zodResolver(createAppSchema) });
    const handleStopTest = async (e: any) => {
        if (!isTesting) {
            return;
        }
        stopStream();
        setIsTesting(false);
        e.preventDefault();
    };
    const handleTest = async (e: any) => {

        if (isTesting) {
            await handleStopTest(e);
            return;
        }

        const allValid = await trigger();
        if (allValid) {
            const formValues = getValues();

            setIsTesting(true);


            generate({
                prompt: formValues.prompt,
                userInput: formValues.demoInput,
            }).then(() => setHasTested(true))
                .finally(
                    () => setIsTesting(false));

        }
    };

    const api = {} as any;


    const mutation = useMutation((data: CreateInputs) =>
        // make API call using fetch or axios or any other library
        fetch(HOST_URL + '/api/app', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json()),
    );
    const { isLoading: isCreating } = mutation;

    const onSubmit: SubmitHandler<CreateInputs> = (response) => {
        if (!isDev && !hasTested) {
            toast('不要忘记先做测试哦 ~', { icon: '🐑' });
        } else {
            mutation.mutate(response, {
                onSuccess: (response) => {
                    let data = {
                        ...response.data,
                        title: response.data.name,
                    };
                    navigate(`/app/${ data.id }`, {
                        state: {
                            data: data,
                        },
                    });
                },
                onError: () => {
                    console.log('on error');
                },
            });
        }
    };
    return (
        <Layout>
            <div>
                <Breadcrumb pages={ [{ name: '创建锦囊', href: '#', current: true }] }/>
                <Helmet>
                    <title>创建锦囊</title>
                </Helmet>
                <div className="bg-slate-50 pt-2">
                    <div className="mx-auto min-h-screen max-w-xl ">

                        <form className="space-y-6 py-4"
                              onSubmit={ handleSubmit(onSubmit) }>
                            <div
                                className="bg-white px-4 pt-4 pb-10 shadow sm:rounded-lg sm:p-6">
                                <div className="mt-2 space-y-4 md:col-span-2 md:mt-0">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label
                                                className="block text-sm font-medium leading-6 mb-2 text-gray-900">
                                                图案标志
                                            </label>
                                            <Controller
                                                name="icon"
                                                control={ control }
                                                defaultValue="🐑"
                                                render={ ({ field }) => (
                                                    <EmojiField
                                                        value={ field.value }
                                                        onChange={ (value) => field.onChange(value) }
                                                    />
                                                ) }
                                            />
                                            <p className="mt-2 text-sm text-red-500">
                                                { errors.icon && errors.icon.message }
                                            </p>
                                            <p className="mt-2 text-sm text-gray-500">
                                                挑选一个 emoji 作为锦囊的图标吧！
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                锦囊名称
                                            </label>
                                            <div
                                                className="mt-2 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    className="block w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-light text-sm sm:leading-6"
                                                    placeholder="FAQ大师"
                                                    { ...register('name') }
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-red-500">
                                                { errors.name && errors.name.message }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                锦囊简介
                                            </label>
                                            <div className="mt-2">
                        <textarea
                            rows={ 1 }
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-light sm:py-1.5 text-sm sm:leading-6"
                            placeholder="捧场型选手必备, 基于话题生成常见问答。"
                            defaultValue={ '' }
                            { ...register('description') }
                        />
                                            </div>
                                            <p className="mt-2 text-sm text-red-500">
                                                { errors.description && errors.description.message }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                角色设定
                                            </label>
                                            <div
                                                className="mt-2 flex rounded-md shadow-sm">
                        <textarea
                            rows={ 3 }
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-light sm:py-1.5 text-sm sm:leading-6"
                            placeholder="你是一个擅长提问的助手，你会针对一段内容，提出疑虑和可能出现的问题，用来促进更完整的思考。请你使用中文，针对下列主题，提供10个相关的问题和答案。"
                            defaultValue={ '' }
                            { ...register('prompt') }
                        />
                                            </div>
                                            <p className="mt-2 text-sm text-red-500">
                                                { errors.prompt && errors.prompt.message }
                                            </p>
                                            {/*<p className="mt-2 text-sm text-gray-500">*/ }
                                            {/*    指令需清晰易懂，明确且有逻辑。*/ }
                                            {/*</p>*/ }
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                唤醒语`
                                            </label>
                                            <div
                                                className="mt-2 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    className="block w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-light text-sm sm:leading-6"
                                                    placeholder="同志们，团队合作才是企业发展的基石"
                                                    { ...register('demoInput') }
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-red-500">
                                                { errors.demoInput && errors.demoInput.message }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between gap-3 sm:px-0">
                                <Button
                                    variant="solid"
                                    color="white"
                                    onClick={ () => navigate('/') }
                                >
                                    返回
                                </Button>

                                <div className="flex justify-end gap-3 px-4 sm:px-0">

                                    <Button
                                        type="button"
                                        variant="solid"
                                        color="slate"
                                        className={ 'min-w-[80px]' }
                                        onClick={ handleTest }
                                        loading={ isTesting }
                                    >
                                        测试
                                    </Button>
                                    <Button
                                        variant="solid"
                                        color="secondary"
                                        type="submit"
                                        className={ 'min-w-[80px]' }
                                        loading={ isCreating }
                                    >
                                        创建
                                    </Button>
                                </div>
                            </div>

                            <div className="my-10 w-full space-y-10">
                                { generatedResults && (
                                    <div className="flex flex-col gap-8">
                                        <h2 className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl">
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
                                                            toast('结果已复制到剪切板', {
                                                                icon: '✂️',
                                                            });
                                                        },
                                                    );

                                                } }
                                            >

                                                <p className="whitespace-pre-line text-left text-sm markdown-body"
                                                   dangerouslySetInnerHTML={ {
                                                       __html: marked(generatedResults.toString(), {
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
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
