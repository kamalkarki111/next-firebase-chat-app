'use client'
import { ErrorContext } from "@/context/error.context"
import { useContext, useEffect } from "react"

export default function ErrorModal() {

    const { error, setError } = useContext(ErrorContext);

    useEffect(() => {

        if (error) {
            setTimeout(() => {
                setError('');
            }, 5000)
        }

    }, [error, setError])

    return (<>
        {error && <div className="fixed" style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }}>
            <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
            >
                <span className="font-medium">Alert!</span> {error}
            </div>
        </div>}
    </>
    )
}