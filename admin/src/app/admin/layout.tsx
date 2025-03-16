import AdminLayout from '@shared/components/AdminLayout';
import React from 'react';

export default function Admin({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
};