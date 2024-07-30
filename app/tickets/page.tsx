import React from 'react';

import prisma from '@/prisma/db';
import DataTickets from './DataTickets';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status, Ticket } from '@prisma/client';

export interface SearchParams {
  page: string;
  status: Status;
  orderBy: keyof Ticket;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const orderBy = searchParams.orderBy ? searchParams.orderBy : 'createdAt';
  const statuses = Object.values(Status);
  const page = parseInt(searchParams.page) || 1;

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  if (status) {
    where = {
      status,
    };
  } else {
    where = {
      NOT: [{ status: 'CLOSED' as Status }],
    };
  }

  const ticketCount = await prisma.ticket.count({ where });
  const ticket = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: 'desc',
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  return (
    <div>
      <div className="flex gap-3">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: 'default' })}
        >
          New Ticket
        </Link>
        <StatusFilter />
      </div>
      <DataTickets tickets={ticket} searchParams={searchParams} />

      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
