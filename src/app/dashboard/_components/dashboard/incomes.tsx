import { useEffect, useRef } from 'react';
import { IncomeItem } from '@/types/income';
import { columnPlacement } from '@/lib/utils';
import { useDashboardStore } from '@/app/stores/useDashboardStore.ts';
import TableCard from '@/app/dashboard/_components/dashboard/tableCard';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import RoundButton from '@/components/ui/roundButton';

const pastIncomes: IncomeItem[] = [
  {
    id: '2',
    description: 'Gift',
    amount: '€500',
    excludeFromAnalytics: false,
    realizedAt: '12/11/2024',
  },
  {
    id: '1',
    description: 'Salary',
    amount: '$1000',
    excludeFromAnalytics: false,
    realizedAt: '31/10/2024',
  },
  {
    id: '3',
    description: 'Salary',
    amount: '$1000',
    excludeFromAnalytics: false,
    realizedAt: '30/09/2024',
  },
  {
    id: '5',
    description: 'Freelance',
    amount: '$200',
    excludeFromAnalytics: false,
    realizedAt: '15/09/2024',
  },
  {
    id: '4',
    description: 'Salary',
    amount: '$1000',
    excludeFromAnalytics: false,
    realizedAt: '31/08/2024',
  },
];

const futureIncomes: IncomeItem[] = [
  {
    id: '6',
    description: 'Freelance',
    amount: '€500',
    excludeFromAnalytics: false,
    realizedAt: '31/06/2025',
  },
  {
    id: '7',
    description: 'Salary',
    amount: '$1000',
    excludeFromAnalytics: false,
    realizedAt: '30/05/2025',
  },
  {
    id: '12',
    description: 'Freelance',
    amount: '€500',
    excludeFromAnalytics: false,
    realizedAt: '31/05/2025',
  },
  {
    id: '13',
    description: 'Salary',
    amount: '$1000',
    excludeFromAnalytics: false,
    realizedAt: '30/04/2025',
  },
  {
    id: '8',
    description: 'Freelance',
    amount: '€500',
    excludeFromAnalytics: false,
    realizedAt: '31/03/2025',
  },
  {
    id: '9',
    description: 'Salary',
    amount: '$1000',
    excludeFromAnalytics: false,
    realizedAt: '28/02/2025',
  },
  {
    id: '10',
    description: 'Freelance',
    amount: '€500',
    excludeFromAnalytics: false,
    realizedAt: '31/01/2025',
  },
  {
    id: '11',
    description: 'Salary',
    amount: '$1000',
    excludeFromAnalytics: false,
    realizedAt: '31/12/2024',
  },
];

export default function Incomes() {
  const isIncomeStreamsVisible = useDashboardStore((state) => state.isIncomeStreamsVisible);
  const tableRef = useRef<HTMLTableElement>(null);
  const splitIndex = futureIncomes.length + 1;
  const isDashboardLocked = useDashboardStore((state) => state.isDashboardLocked);

  useEffect(() => {
    if (tableRef.current) {
      const tableElement = tableRef.current;
      const rows = tableElement.querySelectorAll('tr');
      const currentRow = rows[Number(splitIndex)];

      if (currentRow) {
        const rowHeight = currentRow.offsetHeight;
        const tableHeight = tableElement.offsetHeight;
        const scrollPosition = currentRow.offsetTop - tableHeight / 2 + rowHeight / 2;
        tableElement.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [splitIndex]);

  if (!isIncomeStreamsVisible) {
    return <div className="h-full pointer-events-none" data-swapy-item="c" />;
  }

  const renderItems = () => {
    // This is done to prevent the reacttable from entering a loop when swapy is enabled
    // Essentially switch from using the table model to a
    // static table, and blur it a bit to hide the change
    if (!isDashboardLocked) {
      const items = [...futureIncomes, ...pastIncomes];
      return (
        <table className="w-full blur-sm">
          <tbody className="w-full">
            {items.map((row) => (
              <tr key={row.id}>
                {Object.entries(row)
                  .filter(([key]) => key !== 'id')
                  .map(([key, value]) => (
                    <td
                      key={key + value}
                      className={`${columnPlacement[key as keyof typeof columnPlacement]}`}
                    >
                      {value}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if ((pastIncomes && pastIncomes.length) || (futureIncomes && futureIncomes.length)) {
      return <TableCard pastItems={pastIncomes} futureItems={futureIncomes} />;
    }

    return <p>No Incomes found!</p>;
  };

  return (
    <div className="item h-full p-4" data-swapy-item="c">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Income Streams</CardTitle>
          <div className="flex justify-center items-center w-1/3 h-full">
            <RoundButton variant="plus" />
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto grow h-full" ref={tableRef}>
          {renderItems()}
        </CardContent>
      </Card>
    </div>
  );
}
