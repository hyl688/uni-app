import { UniHttpConfig } from '@/lib/http';

declare const HTTPBASE: string;

export default <UniHttpConfig>{
    baseURL: HTTPBASE,
    header: {
        'Content-Type': 'application/json'
    }
};
