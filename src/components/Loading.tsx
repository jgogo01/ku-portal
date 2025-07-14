import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="text-center">
            <Loader2 className="animate-spin h-10 w-10 text-green-600 mx-auto mb-3" />
            <p className="text-gray-600">กำลังโหลด...</p>
        </div>
    );
}