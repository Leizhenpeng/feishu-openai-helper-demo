import {RATE_LIMIT_COUNT} from '@/utils/constants';
import {useState} from 'react';
import {LicenseForm} from '@/components/LicenseForm';
import {PurchaseAction} from '@/components/PurchaseAction';
import {CheckIcon} from '@heroicons/react/20/solid';
import {useNavigate} from 'react-router-dom';
import {loadLicenseKey} from '@/utils/localData';

const includedFeatures = [
  '每天更多的使用次数，充分发挥锦囊的强大功能',
  '内侧功能优先体验，第一时间感受AI的魅力！',
  '成为插件合伙人，与我们一起打造未来的设计锦囊！'
];
export const Purchase = () => {
    const [shouldShowLicense, setShouldShowLicense] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //   const newLicenseKey = router.query.license_key as string
    //   console.log({ newLicenseKey })
    //
    //   if (newLicenseKey) {
    //     clientValidateLicenseKey(newLicenseKey)
    //       .then(({ isValid }) => {
    //         if (isValid) {
    //           saveLicenseKey(newLicenseKey)
    //           toast('感谢购买, license key 已保存', { icon: '✅' })
    //         }
    //       })
    //       .then(() => {
    //         setShouldShowLicense(true)
    //       })
    //   } else {
    //     if (loadLicenseKey()) {
    //       setShouldShowLicense(true)
    //     }
    //   }
    // }, [router.query.license_key])
    useEffect(() => {
        loadLicenseKey()&&setShouldShowLicense(true)
    },[])

    return (
        <div className="bg-white py-2 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        继续探索
                    </h2>
                    <p className="mt-6 text-md leading-8 text-gray-600">
                        hi~ 锦囊每天都可以免费开启{ RATE_LIMIT_COUNT }次喔。
                        <br/>
                        超出次数也不要紧！还有超赞的插件合伙人计划，和我们一起解锁AI带来的无限灵感吧。
                    </p>
                </div>
                <div
                    className="mx-auto mt-6 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-4  lg:flex-auto">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                            合伙人计划
                        </h3>
                        <p className="mt-6 text-sm leading-7 text-gray-600">
                            您喜欢专业和可爱的结合吗？AI锦囊可以满足您的需求，我们保证最优质的服务让你大呼过瘾！
                        </p>
                        <div className="mt-6 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-secondary-dark">
                                付费功能包括
                            </h4>
                            <div className="h-px flex-auto bg-gray-100"/>
                        </div>
                        <ul
                            role="list"
                            className="mt-6 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                        >
                            { includedFeatures.map((feature) => (
                                <li key={ feature } className="flex gap-x-3">
                                    <CheckIcon
                                        className="h-4 w-5 flex-none text-secondary-dark"
                                        aria-hidden="true"
                                    />
                                    { feature }
                                </li>
                            )) }
                        </ul>
                    </div>
                    <div
                        className="-mt-0 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                        <div
                            className="rounded-2xl bg-gray-50 py-4 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:h-full lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto w-full px-8">
                                { shouldShowLicense ? (
                                    <LicenseForm
                                        onBackToPurchase={ () => setShouldShowLicense(false) }
                                    />
                                ) : (
                                    <PurchaseAction
                                        onAlreadyPurchasedClick={ () => setShouldShowLicense(true) }
                                    />
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
