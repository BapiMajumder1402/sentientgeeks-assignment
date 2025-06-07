// src/app/tasks/page.jsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TaskClient from './TaskClient';

async function getTasks({ page = 1, search = '' }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks?page=${page}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store', 
    }
  );

  if (!res.ok) {
    redirect('/login'); 
  }

  return res.json();
}

export default async function TasksPage({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  const search = searchParams?.search || '';

  const data = await getTasks({ page, search });

  return <TaskClient initialData={data} />;
}
