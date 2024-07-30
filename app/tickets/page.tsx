import React from 'react';

import prisma from '@/prisma/db';
import DataTickets from './DataTickets';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

interface SearchParams {
  page: string;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const ticket = await prisma.ticket.findMany();
  const pageSize = 10;
  console.log(ticket);

  const page = parseInt(searchParams.page) || 1;
  const ticketCount = await prisma.ticket.count();
  return (
    <div>
      <Link
        href="/tickets/new"
        className={buttonVariants({ variant: 'default' })}
      >
        New Ticket
      </Link>
      <DataTickets tickets={ticket} />

      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
