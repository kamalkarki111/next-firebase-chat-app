'use client'
import { ContentCopy } from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';
export default function ChatHeader(){

    const params = useSearchParams()

    return (
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
            <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width={20} height={20}>
                        <circle cx={8} cy={8} r={8} fill="currentColor" />
                    </svg>
                </span>
            </div>
            <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3"><strong>Group name </strong>{params.get('name')}</span>
                </div>
                <span className="text-lg text-gray-600"><strong>Group ID </strong>{params.get('id')} <strong onClick={()=>navigator.clipboard.writeText(params.get('id') as string)} className='m-2'>Copy ID<ContentCopy></ContentCopy></strong></span>
            </div>
        </div>
    </div>
    )
}