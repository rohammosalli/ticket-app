import React from 'react';
import { Badge } from './ui/badge';
import { Status } from '@prisma/client';

interface Props {
  status: Status;
}

const StatusMap: Record<
  Status,
  { label: string; color: 'bg-red-400' | 'bg-blue-400' | 'bg-green-400' }
> = {
  OPEN: { label: 'Open', color: 'bg-red-400' },
  STARTED: { label: 'In Progress', color: 'bg-blue-400' },
  CLOSED: { label: 'CLOSED', color: 'bg-green-400' },
};

const TicketStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      className={`${StatusMap[status].color} text-background hover:${StatusMap[status].color}`}
    >
      {StatusMap[status].label}
    </Badge>
  );
};

export default TicketStatusBadge;
