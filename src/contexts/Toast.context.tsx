import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number; // in milliseconds
}

interface ToastContextType {
    toasts: Toast[];
    add: (message: string, type: ToastType, duration?: number) => void;
    remove: (id: string) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const add = useCallback((message: string, type: ToastType, duration = 3000) => {
        const id = Date.now().toString();
        
        setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
        setTimeout(() => {
            remove(id);
        }, duration);
    }, []);
    const remove = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, add, remove }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    )
}

const ToastContainer: React.FC = () => {
    const context = useToast()
    const { toasts, remove } = context;

    useEffect(() => {
        toast.setContext(context);
    }, [context])

    return (
        <div className='fixed bottom-20 right-2 z-1000'>
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className='px-2 py-1 rounded-md my-1 text-white font-xs'
                    style={{
                        backgroundColor: getBackgroundColor(toast.type),
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <div className='flex justify-between' onClick={() => remove(toast.id)}>
                        <div>{toast.message}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const getBackgroundColor = (type: ToastType): string => {
    switch (type) {
        case 'success':
            return '#22CC88';
        case 'error':
            return '#DD3F57';
        case 'info':
            return '#2196f3';
        case 'warning':
            return '#ff9800';
        default:
            return '#333';
    }
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    
    return context;
};


class ToastService {
    private static instance: ToastService;
    private toastContext: ToastContextType | null = null;
    private queue: Array<{message: string, type: ToastType, duration?: number}> = [];

    private constructor() {}

    public static getInstance(): ToastService {
        if (!ToastService.instance) {
            ToastService.instance = new ToastService();
        }
        return ToastService.instance;
    }

    public setContext(context: ToastContextType) {
        this.toastContext = context;
        this.processQueue();
    }

    private processQueue() {
        if (!this.toastContext) return;
        
        this.queue.forEach(toast => {
            this.toastContext?.add(toast.message, toast.type, toast.duration);
        });
        this.queue = [];
    }

    public add(message: string, type: ToastType, duration?: number) {
        if (!this.toastContext) {
            this.queue.push({ message, type, duration });
            return;
        }
        this.toastContext.add(message, type, duration);
    }

    public remove(id: string) {
        this.toastContext?.remove(id);
    }
}

export const toast = ToastService.getInstance();
