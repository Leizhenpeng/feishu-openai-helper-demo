import {PURCHASE_URL} from '@/utils/constants';

interface PurchaseActionProps {
    onAlreadyPurchasedClick: () => void;
}

export const PurchaseAction = (props: PurchaseActionProps) => {
    return (
        <>
            <p className="text-sm font-semibold text-gray-600">License 可以与小伙伴共享喔 </p>
            <a
                href={ PURCHASE_URL }
                target = "_blank"
                className="lemonsqueezy-button mt-4 block w-full rounded-full bg-secondary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-darker"
            >
                成为插件合伙人
            </a>

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"/>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-gray-50 px-2 text-gray-500">Or</span>
                </div>
            </div>

            <div>
                <button
                    onClick={ props.onAlreadyPurchasedClick }
                    className="inline-flex w-full justify-center rounded-full bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                >
                    <span className="text-sm">已经购买点这里</span>
                </button>
            </div>
        </>
    );
};
