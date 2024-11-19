import { columnPlacement } from '@/lib/utils';
import { TableItem } from '@/types/table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper<TableItem>();

const columns = [
  columnHelper.accessor('id', {}),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('excludeFromAnalytics', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('realizedAt', {
    cell: (info) => info.getValue(),
  }),
];

const columnVisibility = {
  id: false,
  description: true,
  amount: true,
  excludeFromAnalytics: true,
  realizedAt: true,
};

export default function TableCard({
  pastItems,
  futureItems,
}: {
  pastItems: TableItem[];
  futureItems: TableItem[];
}) {
  const items = [...futureItems, ...pastItems];
  const splitAfterId = pastItems[0].id;

  const table = useReactTable({
    data: items,
    columns,
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full">
      <tbody className="w-full">
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={`${row.getValue('id') === splitAfterId && 'border-t-2 border-red-500'}`}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.column.id}
                className={`${columnPlacement[cell.column.id as keyof typeof columnPlacement]}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
