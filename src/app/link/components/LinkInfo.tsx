import React from 'react';
import { Calendar, MapPin, Users, Globe } from 'lucide-react';
import { LinkInterface } from '@/interfaces/Link';

interface LinkInfoProps {
    link: LinkInterface;
}

const LinkInfo: React.FC<LinkInfoProps> = ({ link }) => {
    return (
        <div className="space-y-2">
            {/* Campus Info */}
            {link.campus && link.campus.length > 0 ? (
                <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-wrap gap-1">
                        {link.campus.map(campus => (
                            campus && (
                                <span
                                    key={campus.id}
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                >
                                    {campus.name}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-blue-600">ทุกวิทยาเขต</span>
                </div>
            )}

            {/* Type Person Info */}
            {link.type_person && link.type_person.length > 0 ? (
                <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-wrap gap-1">
                        {link.type_person.map(type => (
                            type && (
                                <span
                                    key={type.id}
                                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                                >
                                    {type.name}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-blue-600">ทุกประเภทผู้ใช้</span>
                </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(link.date_created).toLocaleDateString('th-TH')}
            </div>
        </div>
    );
};

export default LinkInfo;
