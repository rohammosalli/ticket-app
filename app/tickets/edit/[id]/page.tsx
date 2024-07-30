import prisma from '@/prisma/db';
import dynamic from 'next/dynamic';
import React from 'react';

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

interface Props {
  params: { id: string };
}

async function EditTicket({ params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found</p>;
  }
  return <TicketForm ticket={ticket} />;
}

export default EditTicket;
